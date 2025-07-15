import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Bắt buộc'),
  price: yup.string().required('Bắt buộc')

});
