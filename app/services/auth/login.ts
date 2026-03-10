import api from '../api';

export const loginUser = (data: {
  email: string;
  mobile_number: string;
  password: string;
}) => {
  return api.post('/users/login', data);
};