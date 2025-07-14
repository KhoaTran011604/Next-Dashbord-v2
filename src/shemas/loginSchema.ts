import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: yup.string().min(8, 'Ít nhất 8 ký tự').required('Bắt buộc'),
});
