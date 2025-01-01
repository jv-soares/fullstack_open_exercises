import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';
import PatientEntries from './PatientEntries';

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
        <PatientEntries entries={patient.entries} />
      </div>
    )
  );
};

export default PatientDetailsPage;
