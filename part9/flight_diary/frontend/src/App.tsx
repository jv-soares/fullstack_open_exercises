import axios from 'axios';
import { useEffect, useState } from 'react';

interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/diaries')
      .then((e) => setDiaries(e.data));
  }, []);

  return (
    <div>
      <h1>Flight diaries</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {diaries.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.weather}</td>
              <td>{e.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
