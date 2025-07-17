import * as yup from 'yup';

export const userUpdateSchema = yup.object({
  fullName: yup.string().required('Bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
});
