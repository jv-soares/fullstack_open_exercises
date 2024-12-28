import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((e) => (
        <Part key={e.name} coursePart={e}></Part>
      ))}
    </div>
  );
};

export default Content;
