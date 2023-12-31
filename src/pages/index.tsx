import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

import { type NextPageWithLayout } from '@/pages/_app';

import { SignInForm } from '@/components/forms/signin-form';

import { Auth } from '@/layouts/auth';
import { Main } from '@/layouts/main';

import { axiosApiInstance } from '@/axios';

import { getAuthorizedUserUsername } from '@/api/users';

import { PAGES, TOKEN_NAME } from '@/lib/constants';

const Index: NextPageWithLayout = () => {
  return <SignInForm />;
};

Index.getLayout = (page) => (
  <Main title='Auth / Sign In'>
    <Auth>{page}</Auth>
  </Main>
);

export const getServerSideProps = (async (context) => {
  const token = nookies.get(context)[TOKEN_NAME];

  axiosApiInstance.defaults.headers.Authorization = `Bearer ${token}`;

  try {
    await getAuthorizedUserUsername();

    return {
      redirect: {
        destination: PAGES.MY_PROFILE,
        permanent: false
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
}) satisfies GetServerSideProps;

export default Index;
