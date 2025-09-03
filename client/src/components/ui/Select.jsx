import { Select as RizzSelect } from "rizzui/select";

const Select = ({ options, value, setter, label, error, disabled, helperText }) => {
  return (
    <RizzSelect
      labelClassName="opacity-85"
      label={label}
      options={options}
      value={value}
      onChange={(selected) => {
        setter(selected);
      }}
      clearable
      onClear={() => setter("")}
      error={error}
      disabled={disabled}
      helperText={helperText}
    />
  );
};

export default Select;
