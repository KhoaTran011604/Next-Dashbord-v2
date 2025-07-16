import * as yup from 'yup';

export const userSchema = yup.object({
  fullName: yup.string().required('Bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: yup.string().min(8, 'Ít nhất 8 ký tự').required('Bắt buộc'),
});
