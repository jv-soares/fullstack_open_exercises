import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../../core/types';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryTable from './components/DiaryTable';
import diaryService from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  }, []);

  const addEntry = (newEntry: NewDiaryEntry) => {
    diaryService.create(newEntry).then((e) => {
      const newDiaries = diaries.concat(e);
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
