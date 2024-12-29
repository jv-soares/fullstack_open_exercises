import { useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../../../core/types';
import RadioGroup from './RadioGroup';

const DiaryEntryForm = ({
  onSubmitted,
}: {
  onSubmitted: (newEntry: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');

  const enumToString = (type: { [s: string]: string }) =>
    Object.values(type).map((e) => e.toString());

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
    };
    onSubmitted(newEntry);
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></input>
        </div>
        <RadioGroup
          label="Weather:"
          values={enumToString(Weather)}
          onChange={setWeather}
        />
        <RadioGroup
          label="Visibility:"
          values={enumToString(Visibility)}
          onChange={setVisibility}
        />
        <input type="submit" value="Add entry"></input>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
