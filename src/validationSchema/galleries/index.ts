import * as yup from 'yup';

export const galleryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  image_limit: yup.number().integer().required(),
  subscriber_id: yup.string().nullable().required(),
});
