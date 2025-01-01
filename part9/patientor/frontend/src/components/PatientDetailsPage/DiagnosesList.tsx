import { useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnoses';
import { Diagnosis, DiagnosisCodes } from '../../types';

const DiagnosesList = ({ codes }: { codes: DiagnosisCodes }) => {
  const [patientDiagnoses, setPatientDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    getPatientDiagnoses(codes).then(setPatientDiagnoses);
  }, [codes]);

  return (
    <ul>
      {patientDiagnoses.map((diagnosis) => (
        <li key={diagnosis.code}>
          {diagnosis.code}: {diagnosis.name}
        </li>
      ))}
    </ul>
  );
};

const getPatientDiagnoses = async (
  codes: DiagnosisCodes
): Promise<Diagnosis[]> => {
  const allDiagnoses = await diagnosisService.getAll();
  return codes
    .map((code) => allDiagnoses.find((diagnosis) => diagnosis.code === code))
    .filter((diagnosis) => diagnosis !== undefined);
};

export default DiagnosesList;
