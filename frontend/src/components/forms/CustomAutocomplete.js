import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const CustomAutocomplete = ({ name, label, options, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <Autocomplete
      {...props}
      id={name}
      options={options}
      getOptionLabel={(option) => option.label || ""}
      onChange={(event, newValue) => {
        setFieldValue(name, newValue ? newValue.value : "");
      }}
      loadingText="Carregando..."
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={label}
          onBlur={() => setFieldTouched(name, true)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
