import { TextField, MenuItem, Button } from "@mui/material";
import { useField, useFormikContext } from "formik";

export const CustomTextField = ({ name, ...other }) => {
  const [field, meta] = useField(name);
  const defaultConfiq = {
    ...field,
    ...other,
    variant: "outlined",
    fullWidth: true,
  };
  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

// custom select
export const CustomSelect = ({ name, options, ...other }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const defaultConfiq = {
    select: true,
    variant: "outlined",
    fullWidth: true,
    ...other,
    ...field,
    onchange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return (
    <TextField {...defaultConfiq}>
      {options.map((option) => {
        return (
          <MenuItem key={option._id} value={option._id || option.name}>
            {option.branch_name ||
              option.brand_name ||
              option.supplier_name ||
              option.product_name ||
              option.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

//custom date input

export const CustomDate = ({ name, ...other }) => {
  const [field, meta] = useField(name);

  const defaultConfiq = {
    type: "date",
    variant: "outlined",
    ...field,
    ...other,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

//Custom

// Custom button
export const CustomButton = ({ children, ...other }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const defaultConfiq = {
    onClick: handleSubmit,
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };

  return <Button {...defaultConfiq}>{children}</Button>;
};