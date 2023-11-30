import { axiosApiInstance } from '@/axios';

import { Chat, ChatFromListOfChats } from '@/lib/types';

export const CHATS_ROUTE = '/chats';

// ------------------- swr uses this functions -------------------
const getAutorizedUserChats = async (url: string) => {
  const { data } = await axiosApiInstance.get<ChatFromListOfChats[]>(`${url}`);

  return data;
};
// ------------------- swr uses this functions -------------------

const initiateChat = async (addresseeUsername: string) => {
  const { data: id } = await axiosApiInstance.post<string>(`${CHATS_ROUTE}`, {
    addresseeUsername
  });

  return id;
};

const getChatIdByAddresseeUsername = async (addresseeUsername: string) => {
  const { data: id } = await axiosApiInstance.get<string>(
    `${CHATS_ROUTE}/between-users-chat-id?addressee=${addresseeUsername}`
  );

  return id;
};

const getChatData = async (id: string) => {
  const { data } = await axiosApiInstance.get<Chat>(`${CHATS_ROUTE}/${id}`);

  return data;
};

export {
  getAutorizedUserChats,
  initiateChat,
  getChatIdByAddresseeUsername,
  getChatData
};
