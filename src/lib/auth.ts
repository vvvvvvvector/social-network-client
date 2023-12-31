import { type GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { axiosApiInstance } from '@/axios';

import { getAuthorizedUserUsername } from '@/api/users';

import { PAGES, TOKEN_NAME } from '@/lib/constants';

type Redirect = {
  destination: string;
  permanent: boolean;
};

const AUTH_USER_USERNAME_KEY_NAME = 'authorizedUserUsername';

type IsAuthorizedNarrowedReturnType =
  | {
      [AUTH_USER_USERNAME_KEY_NAME]: string;
    }
  | {
      redirect: Redirect;
    };

export const isRedirect = (
  res: IsAuthorizedNarrowedReturnType
): res is { redirect: Redirect } => {
  if (AUTH_USER_USERNAME_KEY_NAME in res) return false;

  return 'redirect' in res;
};

export const isAuthorized = async (
  context: GetServerSidePropsContext
): Promise<IsAuthorizedNarrowedReturnType> => {
  const token = nookies.get(context)[TOKEN_NAME]; // get token from the request

  axiosApiInstance.defaults.headers.Authorization = `Bearer ${token}`; // set cookie / token on the server

  try {
    const username = await getAuthorizedUserUsername(); // request which requires token. It will return error if user is not authorized

    return {
      [AUTH_USER_USERNAME_KEY_NAME]: username
    };
  } catch (err) {
    return {
      redirect: {
        destination: PAGES.SIGN_IN,
        permanent: false
      }
    };
  }
};
