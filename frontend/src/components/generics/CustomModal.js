import { Card, CardContent, Modal, Stack, Typography } from "@mui/material";

export default function CustomModal({
  open,
  handleClose,
  padding = "16px !important",
  title,
  subtitle,
  children,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent sx={{ padding }}>
          <Stack gap={1}>
            {title && (
              <Typography id="modal-title" variant="h3" textAlign="center">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                id="modal-description"
                variant="body1"
                textAlign="center"
              >
                {subtitle}
              </Typography>
            )}
            {children}
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  );
}
