import { AddOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function CustomHeaderPage({ title, buttonLabel, action }) {
  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={1}
    >
      <Typography component="h1" variant="h1" aria-label={title}>
        {title}
      </Typography>
      {action && (
        <Button
          startIcon={<AddOutlined />}
          color="primary"
          variant="contained"
          aria-label={buttonLabel}
          onClick={() => action()}
        >
          {buttonLabel}
        </Button>
      )}
    </Stack>
  );
}
