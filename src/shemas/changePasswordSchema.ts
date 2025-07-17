import * as yup from 'yup';

export const changePasswordSchema = yup.object({
  password: yup.string().min(8, 'Ít nhất 8 ký tự').required('Bắt buộc'),
});
