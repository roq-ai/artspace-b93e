import { ImageInterface } from 'interfaces/image';
import { SubscriberInterface } from 'interfaces/subscriber';
import { GetQueryInterface } from 'interfaces';

export interface GalleryInterface {
  id?: string;
  name: string;
  subscriber_id: string;
  image_limit?: number;
  created_at?: any;
  updated_at?: any;
  image?: ImageInterface[];
  subscriber?: SubscriberInterface;
  _count?: {
    image?: number;
  };
}

export interface GalleryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  subscriber_id?: string;
}
