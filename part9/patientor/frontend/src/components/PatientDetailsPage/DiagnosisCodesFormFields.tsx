import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import diagnoseService from '../../services/diagnoses';
import { DiagnosisCodes } from '../../types';

const DiagnosisCodesFormField = ({
  codes,
  onChange,
}: {
  codes: DiagnosisCodes;
  onChange: (codes: DiagnosisCodes) => void;
}) => {
  const [allCodes, setCodes] = useState<DiagnosisCodes>([]);

  useEffect(() => {
    diagnoseService.getAll().then((diagnoses) => {
      const codes = diagnoses.map((e) => e.code);
      setCodes(codes);
    });
  }, []);

  const handleChange = (code: string, checked: boolean) => {
    if (checked) {
      const updatedCodes = [...codes, code];
      onChange(updatedCodes);
    } else {
      const updatedCodes = codes.filter((e) => e !== code);
      onChange(updatedCodes);
    }
  };

  return (
    <div>
      <Typography>Diagnosis codes</Typography>
      {allCodes.map((code) => (
        <FormControlLabel
          key={code}
          control={
            <Checkbox
              checked={codes?.includes(code)}
              onChange={(event) => handleChange(code, event.target.checked)}
            />
          }
          label={code}
        />
      ))}
    </div>
  );
};

export default DiagnosisCodesFormField;
