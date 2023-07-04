import axios from 'axios';
import queryString from 'query-string';
import { ImageInterface, ImageGetQueryInterface } from 'interfaces/image';
import { GetQueryInterface } from '../../interfaces';

export const getImages = async (query?: ImageGetQueryInterface) => {
  const response = await axios.get(`/api/images${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createImage = async (image: ImageInterface) => {
  const response = await axios.post('/api/images', image);
  return response.data;
};

export const updateImageById = async (id: string, image: ImageInterface) => {
  const response = await axios.put(`/api/images/${id}`, image);
  return response.data;
};

export const getImageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/images/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteImageById = async (id: string) => {
  const response = await axios.delete(`/api/images/${id}`);
  return response.data;
};
