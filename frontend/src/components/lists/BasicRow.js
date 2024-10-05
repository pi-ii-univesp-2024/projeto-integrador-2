import { Stack, Typography } from "@mui/material";

export default function BasicRow({ title, value }) {
  return (
    <Stack direction="row" alignItems="center" minWidth={0} gap={1}>
      {title && (
        <Typography variant="h5" textOverflow="ellipsis" noWrap>
          {title}:
        </Typography>
      )}
      {value && (
        <Typography
          variant="body1"
          textOverflow="ellipsis"
          title={value}
          // noWrap
        >
          {value}
        </Typography>
      )}
    </Stack>
  );
}
