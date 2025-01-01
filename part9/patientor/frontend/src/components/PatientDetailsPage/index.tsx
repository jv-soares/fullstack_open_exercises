import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import diagnosisService from '../../services/diagnoses';
import patientService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';
import PatientEntries from './PatientEntries';

const PatientDetailsPage = () => {
  const patientId = useParams().id!;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    patientService.getById(patientId).then(setPatient);
  }, [patientId]);

  useEffect(() => {
    diagnosisService.getAll().then(setDiagnoses);
  }, []);

  return (
    patient && (
      <div>
        <h2>{patient.name}</h2>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <PatientEntries entries={patient.entries} diagnoses={diagnoses} />
      </div>
    )
  );
};

export default PatientDetailsPage;
