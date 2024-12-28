import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {coursePart.name}: {coursePart.description}
          </h3>
          <ul>
            <li>{coursePart.exerciseCount} exercises</li>
          </ul>
        </div>
      );

    case 'group':
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <ul>
            <li>{coursePart.exerciseCount} exercises</li>
            <li>{coursePart.groupProjectCount} project exercises</li>
          </ul>
        </div>
      );

    case 'background':
      return (
        <div>
          <h3>
            {coursePart.name}: {coursePart.description}
          </h3>
          <ul>
            <li>{coursePart.exerciseCount} exercises</li>
            <li>Background material: {coursePart.backgroundMaterial}</li>
          </ul>
        </div>
      );

    case 'special':
      return (
        <div>
          <h3>
            {coursePart.name}: {coursePart.description}
          </h3>
          <ul>
            <li>{coursePart.exerciseCount} exercises</li>
            <li>Requirements: {coursePart.requirements.join(', ')}</li>
          </ul>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
