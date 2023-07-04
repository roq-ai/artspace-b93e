import axios from 'axios';
import queryString from 'query-string';
import { GalleryInterface, GalleryGetQueryInterface } from 'interfaces/gallery';
import { GetQueryInterface } from '../../interfaces';

export const getGalleries = async (query?: GalleryGetQueryInterface) => {
  const response = await axios.get(`/api/galleries${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGallery = async (gallery: GalleryInterface) => {
  const response = await axios.post('/api/galleries', gallery);
  return response.data;
};

export const updateGalleryById = async (id: string, gallery: GalleryInterface) => {
  const response = await axios.put(`/api/galleries/${id}`, gallery);
  return response.data;
};

export const getGalleryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/galleries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGalleryById = async (id: string) => {
  const response = await axios.delete(`/api/galleries/${id}`);
  return response.data;
};
