import api from '../api';

export const forgotPassword = (data: {
  userId: string;
  password: string;
}) => {
  return api.post('/users/forgotpassword', data);
};