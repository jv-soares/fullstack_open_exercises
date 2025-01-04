import {
  BusinessCenterOutlined,
  FavoriteBorder,
  LocalHospitalOutlined,
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Entry } from '../../types';
import { assertNever } from '../../utils';

const EntryTypeChip = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return (
        <Chip label="Occupational Health" icon={<BusinessCenterOutlined />} />
      );
    case 'Hospital':
      return <Chip label="Hospital" icon={<LocalHospitalOutlined />} />;
    case 'HealthCheck':
      return <Chip label="Health Check" icon={<FavoriteBorder />} />;
    default:
      return assertNever(entry);
  }
};

export default EntryTypeChip;
