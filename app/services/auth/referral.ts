import api from '../api';

export const claimReferral = (data: {
  userId: string;
  referred_by: string;
}) => {
  return api.post('/users/claimreferral', data);
};