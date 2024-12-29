import { DiaryEntry } from '../../../core/types';

const DiaryTable = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
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

export default DiaryTable;
