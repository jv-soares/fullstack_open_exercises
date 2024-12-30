import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../../core/types';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryTable from './components/DiaryTable';
import ErrorMessage from './components/ErrorMessage';
import diaryService from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  }, []);

  const addEntry = (newEntry: NewDiaryEntry) => {
    diaryService
      .create(newEntry)
      .then((addedEntry) => {
        const newDiaries = diaries.concat(addedEntry);
        setDiaries(newDiaries);
      })
      .catch((error) => showErrorMessage(error.response.data));
  };

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DiaryEntryForm onSubmitted={addEntry} />
      <DiaryTable diaries={diaries} />
    </div>
  );
};

export default App;
