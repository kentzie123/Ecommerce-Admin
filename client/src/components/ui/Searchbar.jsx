//rizz ui
import { Input as RizzInput  } from "rizzui";

const Searchbar = ({ label, type, placeholder, className }) => {
  return (
    <RizzInput
      inputClassName={`max-h-[36px] ${className}`}
      type={type || "text"}
      label={label || ""}
      placeholder={placeholder || ""}
    />
  );
};

export default Searchbar;
