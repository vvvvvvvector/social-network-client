import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import { Main } from '@/layouts/main';
import { Authorized } from '@/layouts/authorised';

import { DefaultProfile } from '@/components/profiles/default-profile';
import { FriendProfile } from '@/components/profiles/friend-profile';

import { getNetworkUserPubliclyAvailableData } from '@/api/users';

import { isAuthorized, isRedirect } from '@/lib/auth';
import { NetworkUser } from '@/lib/types';

import { useFrequentlyUsedHooks } from '@/hooks/use-frequently-used-hooks';

import { useSocketStore } from '@/zustand/socket.store';

type PageUrlParams = {
  username: string;
};

export interface Props {
  user: NetworkUser | null;
}

const Index: NextPageWithLayout<Props> = ({ user }) => {
  const { router } = useFrequentlyUsedHooks();

  const { socket } = useSocketStore();

  if (!socket) {
    return (
      <div className='rounded-lg bg-background p-5'>
        <p className='mb-7 mt-7 text-center leading-9'>
          Something wrong with your connection
          <br /> Please try again later
          <br /> <span className='text-4xl'>😭</span>
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='rounded-lg bg-background p-5'>
        <p className='mb-7 mt-7 text-center leading-9'>
          <span>
            User
            <span className='font-bold'>{` ${router.query.username} `}</span>
            doesn't exist.
          </span>
          <br /> <span className='text-4xl'>🧐</span>
        </p>
      </div>
    );
  }

  if (user.extendedFriendRequestStatus === 'friend')
    return (
      <FriendProfile
        socket={socket}
        user={{
          username: user.username,
          profile: user.profile,
          lastSeen: user.lastSeen,
          contacts: user.contacts
        }}
      />
    );

  return (
    <DefaultProfile
      extendedFriendRequestStatus={user.extendedFriendRequestStatus}
      username={user.username}
      lastSeen={user.lastSeen}
      profile={user.profile}
      contacts={user.contacts}
    />
  );
};

Index.getLayout = (page) => {
  const notFoundTitle = 'User not found :<';

  const username = page.props.children[1].props.user?.username || notFoundTitle;

  const title = username === notFoundTitle ? notFoundTitle : `@${username}`;

  return (
    <Main title={title}>
      <Authorized>{page}</Authorized>
    </Main>
  );
};

export const getServerSideProps = (async (context) => {
  try {
    const res = await isAuthorized(context);

    if (isRedirect(res)) return res;

    const { username } = context.params!; // ! operator is a type assertion operator that tells the TypeScript compiler that a variable is not null or undefined, and it should be treated as such.

    const user = await getNetworkUserPubliclyAvailableData(username);

    return {
      props: {
        user
      }
    };
  } catch (error) {
    return {
      props: {
        user: null
      }
    };
  }
}) satisfies GetServerSideProps<Props, PageUrlParams>;

export default Index;
