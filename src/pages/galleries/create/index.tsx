import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGallery } from 'apiSdk/galleries';
import { Error } from 'components/error';
import { galleryValidationSchema } from 'validationSchema/galleries';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { SubscriberInterface } from 'interfaces/subscriber';
import { getSubscribers } from 'apiSdk/subscribers';
import { GalleryInterface } from 'interfaces/gallery';

function GalleryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GalleryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGallery(values);
      resetForm();
      router.push('/galleries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GalleryInterface>({
    initialValues: {
      name: '',
      image_limit: 0,
      subscriber_id: (router.query.subscriber_id as string) ?? null,
    },
    validationSchema: galleryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Gallery
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="image_limit" mb="4" isInvalid={!!formik.errors?.image_limit}>
            <FormLabel>Image Limit</FormLabel>
            <NumberInput
              name="image_limit"
              value={formik.values?.image_limit}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('image_limit', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.image_limit && <FormErrorMessage>{formik.errors?.image_limit}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SubscriberInterface>
            formik={formik}
            name={'subscriber_id'}
            label={'Select Subscriber'}
            placeholder={'Select Subscriber'}
            fetcher={getSubscribers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'gallery',
    operation: AccessOperationEnum.CREATE,
  }),
)(GalleryCreatePage);
