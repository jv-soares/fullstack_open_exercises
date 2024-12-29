import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../../core/types';

const baseUrl = 'http://localhost:3000/api';

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(`${baseUrl}/diaries`);
  return response.data;
};

const create = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post(`${baseUrl}/diaries`, entry);
  return response.data;
};

export default { getAll, create };
