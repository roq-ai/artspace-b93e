import * as yup from 'yup';

export const imageValidationSchema = yup.object().shape({
  name: yup.string().required(),
  gallery_id: yup.string().nullable().required(),
});
