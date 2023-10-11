import { FC } from 'react';
import { Heart, Image } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/Avatar';

import { UserProfileProps } from '@/pages/[username]';

interface FriendProfileProps
  extends Omit<UserProfileProps['user'], 'isFriend'> {}

export const NotFriendProfile: FC<FriendProfileProps> = (user) => {
  return (
    <div className='bg-white p-5 rounded-lg'>
      <div className='flex gap-5 items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              size='large'
              username={user.username}
              avatar={user.profile?.avatar}
            />
          </DropdownMenuTrigger>
          {user.profile?.avatar && (
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  (location.href = `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${user?.profile?.avatar}`)
                }
              >
                <Image className='mr-2 h-4 w-4' />
                <span>Open photo</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className='mr-2 h-4 w-4' />
                <span>Like photo</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <div>
          <span className='text-2xl font-semibold'>{user.username}</span>
        </div>
      </div>
      <Separator className='mt-4 mb-4' />
      <ul className='flex flex-col gap-5'>
        <li>{`is profile activated: ${user.profile.isActivated}`}</li>
        <li>{`profile created at: ${new Date(user.profile.createdAt)}`}</li>
        <li>{`email: ${
          user.contacts.email.isPublic ? user.contacts.email.contact : 'private'
        }`}</li>
      </ul>
    </div>
  );
};
