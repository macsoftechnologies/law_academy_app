import api from '../api';

export const registerUser = (data: {
  name: string;
  email: string;
  mobile_number: string;
  password: string;
}) => {
  return api.post('/users/register', data);
};