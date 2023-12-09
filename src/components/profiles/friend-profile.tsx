import { FC } from 'react';
import { Heart, Image, UserCheck } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/tooltip';

import {
  DROPDOWN_MENU_ICON_STYLES,
  ICON_INSIDE_BUTTON_SIZE
} from '@/lib/constants';
import { formatDate, formatTime } from '@/lib/utils';
import { NetworkUser } from '@/lib/types';

import { useRequestsActions } from '@/hooks/use-requests-actions';
import { useCommonActions } from '@/hooks/use-common-actions';

export const FriendProfile: FC<
  Omit<NetworkUser, 'extendedFriendRequestStatus'>
> = (user) => {
  const { writeMessage, openPhoto } = useCommonActions();

  const { unfriend } = useRequestsActions();

  return (
    <div className='rounded-lg bg-background p-5'>
      <div className='relative flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                size='large'
                username={user.username}
                avatar={user.profile.avatar?.name}
              />
            </DropdownMenuTrigger>
            {user.profile.avatar && (
              <DropdownMenuContent>
                <DropdownMenuItem onClick={openPhoto(user.profile.avatar.name)}>
                  <Image className={DROPDOWN_MENU_ICON_STYLES} />
                  <span>Open photo</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className={DROPDOWN_MENU_ICON_STYLES} />
                  <span>{`Like photo`}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          <div className='relative top-3 flex flex-col'>
            <span className='mb-4 text-2xl font-semibold'>{`${user.username}`}</span>
            <span>{`bio: ${user.profile.bio ?? 'no bio yet 😔'}`}</span>
          </div>
        </div>
        <Badge className='absolute -right-0 -top-0'>{`Friend 🎉`}</Badge>
        <div className='flex items-center gap-4'>
          <Button onClick={writeMessage(user.username)}>Message</Button>
          <Tooltip side='bottom' text='Unfriend'>
            <Button
              onClick={unfriend(user.username)}
              variant='outline'
              size='icon'
            >
              <UserCheck size={ICON_INSIDE_BUTTON_SIZE} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Separator className='mb-4 mt-4' />
      <ul className='flex flex-col gap-5'>
        <li>
          <time suppressHydrationWarning>
            {`last seen ${formatDate(user.lastSeen)} at ${formatTime(
              user.lastSeen
            )}`}
          </time>
        </li>
        <li>{`avatar likes: ${
          user.profile.avatar?.likes ?? 'no photo yet'
        } ❤️`}</li>
        <li>{`is profile activated: ${user.profile.isActivated}`}</li>
        <li>
          joined on:
          <time suppressHydrationWarning>
            {` ${formatDate(user.profile.createdAt)}`}
          </time>
        </li>
        <li>{`email: ${
          user.contacts.email.isPublic ? user.contacts.email.contact : 'private'
        }`}</li>
        <li>{'for instance, only for friends content here...'}</li>
      </ul>
    </div>
  );
};