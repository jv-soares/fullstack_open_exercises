interface RadioGroupProps {
  label: string;
  values: string[];
  onChange: (value: string) => void;
}

const RadioGroup = ({ label, values, onChange }: RadioGroupProps) => {
  return (
    <div>
      <label>{label}</label>
      {values.map((e) => (
        <span key={e}>
          <input
            type="radio"
            name={label}
            value={e}
            onChange={(event) => onChange(event.target.value)}
          ></input>
          <label>{e}</label>
        </span>
      ))}
    </div>
  );
};

export default RadioGroup;
