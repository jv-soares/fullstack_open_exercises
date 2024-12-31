import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientDetailsPage = () => {
  const patientId = useParams().id!;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    patientService.getById(patientId).then(setPatient);
  }, [patientId]);

  return (
    patient && (
      <div>
        <h2>{patient.name}</h2>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <div>
          <h3>Entries</h3>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <p>
                {entry.date}: {entry.description}
              </p>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default PatientDetailsPage;
