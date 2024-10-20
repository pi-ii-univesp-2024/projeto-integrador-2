import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";

const CustomDateInput = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <DatePicker
      {...props}
      label={label}
      value={field.value || null}
      onChange={(newValue) => {
        setFieldValue(name, newValue);
      }}
      slotProps={{
        textField: {
          onBlur: () => setFieldTouched(name, true),
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched && meta.error,
          size: "small",
        },
      }}
    />
  );
};

export default CustomDateInput;
