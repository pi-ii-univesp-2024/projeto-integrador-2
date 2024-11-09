import { TextField } from "@mui/material";
import { useField } from "formik";

const CustomTextField = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      id={name}
      label={label}
      size="small"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      autoComplete="off"
    />
  );
};

export default CustomTextField;
