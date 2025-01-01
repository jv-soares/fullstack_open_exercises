import { Diagnosis, Entry } from '../../types';

interface PatientEntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntries = ({ entries, diagnoses }: PatientEntriesProps) => {
  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>
            {entry.date}: {entry.description}
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes
                .map((code) => diagnoses.find((e) => e.code === code))
                .filter((diagnosis) => diagnosis !== undefined)
                .map((diagnosis) => (
                  <li key={diagnosis.code}>
                    {diagnosis.code}: {diagnosis.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;
