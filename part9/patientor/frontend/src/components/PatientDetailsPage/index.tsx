import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Entry, Patient } from '../../types';
import PatientEntries from './PatientEntries';

const PatientDetailsPage = () => {
  const patientId = useParams().id!;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    patientService.getById(patientId).then(setPatient);
  }, [patientId]);

  const addPatientEntry = (entry: Entry) => {
    if (!patient) return;
    const newEntries = [...patient.entries, entry];
    setPatient({ ...patient, entries: newEntries });
  };

  return (
    patient && (
      <div>
        <h2>{patient.name}</h2>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <PatientEntries
          entries={patient.entries}
          onEntryAdded={addPatientEntry}
        />
      </div>
    )
  );
};

export default PatientDetailsPage;
