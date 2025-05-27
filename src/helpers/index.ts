import axios from 'axios';
import { API_URL_JPH, NETWORK_DELAY } from '../constants';
import { User } from '../types';
import { Photo } from '../types';
import { sleep } from '../utils';

export const fetchUser = async (userId: number): Promise<User> => {
  const { data } = await axios.get(`${API_URL_JPH}/users/${userId}`);
  await sleep(NETWORK_DELAY);
  return data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${API_URL_JPH}/users`);
  return data;
};

export const fetchUserPhotos = async (): Promise<Photo[]> => {
  const { data } = await axios.get(`${API_URL_JPH}/photos`);
  await sleep(NETWORK_DELAY);
  return data;
};

export const updateUser = async (userId: number, user: User): Promise<User> => {
  const { data } = await axios.put(`${API_URL_JPH}/users/${userId}`, {
    ...user,
  });
  await sleep(2000);
  return data;
};
