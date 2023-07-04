import axios from 'axios';
import queryString from 'query-string';
import { SubscriberInterface, SubscriberGetQueryInterface } from 'interfaces/subscriber';
import { GetQueryInterface } from '../../interfaces';

export const getSubscribers = async (query?: SubscriberGetQueryInterface) => {
  const response = await axios.get(`/api/subscribers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSubscriber = async (subscriber: SubscriberInterface) => {
  const response = await axios.post('/api/subscribers', subscriber);
  return response.data;
};

export const updateSubscriberById = async (id: string, subscriber: SubscriberInterface) => {
  const response = await axios.put(`/api/subscribers/${id}`, subscriber);
  return response.data;
};

export const getSubscriberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/subscribers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSubscriberById = async (id: string) => {
  const response = await axios.delete(`/api/subscribers/${id}`);
  return response.data;
};
