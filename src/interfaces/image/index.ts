import { GalleryInterface } from 'interfaces/gallery';
import { GetQueryInterface } from 'interfaces';

export interface ImageInterface {
  id?: string;
  name: string;
  gallery_id: string;
  created_at?: any;
  updated_at?: any;

  gallery?: GalleryInterface;
  _count?: {};
}

export interface ImageGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  gallery_id?: string;
}
