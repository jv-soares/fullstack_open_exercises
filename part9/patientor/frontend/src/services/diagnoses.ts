import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default { getAll };
