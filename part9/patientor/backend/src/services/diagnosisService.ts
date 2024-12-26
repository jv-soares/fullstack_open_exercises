import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
  return data;
};

export default { getAll };
