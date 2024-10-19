import { Stack, Typography } from "@mui/material";

export default function TitleValueComponent({
  title,
  value,
  direction = "column",
}) {
  return (
    <Stack direction={direction} minWidth={0} gap={1}>
      {title && <Typography variant="h5">{title}:</Typography>}
      {value && (
        <Typography variant="body1" textOverflow="ellipsis" title={value}>
          {value}
        </Typography>
      )}
    </Stack>
  );
}
