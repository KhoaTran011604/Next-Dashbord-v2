import * as yup from 'yup';

export const orderSchema = yup.object({
  // name: yup.string().required('Bắt buộc'),
  // price: yup.string().required('Bắt buộc').notOneOf(['0'], 'Giá phải lớn hơn 0'),

});
