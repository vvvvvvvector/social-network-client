import axios from 'axios';

import { useCombain } from '@/hooks/use-combain';

import {
  unfriend,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  sendFriendRequest
} from '@/api/friends';

export const useFriendsActions = () => {
  const { router, toast } = useCombain();

  const revalidate = () => {
    router.replace(router.asPath, undefined, {
      scroll: false
    });
  };

  const onClickUnfriend = (username: string) => async () => {
    await unfriend(username);

    toast({
      description: `${username} was successfully deleted from your friends list.`
    });

    revalidate();
  };

  const onClickAcceptFriendRequest = (username: string) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      try {
        await acceptFriendRequest(username);

        toast({
          description: 'Friend request was successfully accepted.'
        });

        revalidate();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            description: `${error.response?.data.message}`
          });
        }
      }
    };
  };

  const onClickRejectFriendRequest = (username: string) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      try {
        await rejectFriendRequest(username);

        toast({
          description: 'Friend request was successfully rejected.'
        });

        revalidate();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            description: `${error.response?.data.message}`
          });
        }
      }
    };
  };

  const onClickCancelRequest = (username: string) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      try {
        await cancelFriendRequest(username);

        toast({
          description: 'Friend request was successfully canceled.'
        });

        revalidate();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            description: `${error.response?.data.message}`
          });
        }
      }
    };
  };

  const onClickSendFriendRequest = (username: string) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      try {
        await sendFriendRequest(username);

        toast({
          description: 'Friend request was successfully sent.'
        });

        revalidate();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            description: `${error.response?.data.message}`
          });
        }
      }
    };
  };

  return {
    accept: onClickAcceptFriendRequest,
    unfriend: onClickUnfriend,
    reject: onClickRejectFriendRequest,
    cancel: onClickCancelRequest,
    send: onClickSendFriendRequest
  };
};
