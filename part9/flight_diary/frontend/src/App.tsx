import axios from 'axios';
import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../../core/types';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryTable from './components/DiaryTable';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/diaries')
      .then((e) => setDiaries(e.data));
  }, []);

  const addEntry = (newEntry: NewDiaryEntry) => {
    axios.post('http://localhost:3000/api/diaries', newEntry).then((e) => {
      const newDiaries = diaries.concat(e.data);
      setDiaries(newDiaries);
    });
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <DiaryEntryForm onSubmitted={addEntry} />
      <DiaryTable diaries={diaries} />
    </div>
  );
};

export default App;
