import { useParams } from 'react-router-dom';
import { Patient } from '../../types';

const PatientDetailsPage = ({ patients }: { patients: Patient[] }) => {
  const { id } = useParams();
  const patient = patients.find((e) => e.id === id);
  return (
    patient && (
      <div>
        <h2>{patient.name}</h2>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
      </div>
    )
  );
};

export default PatientDetailsPage;
