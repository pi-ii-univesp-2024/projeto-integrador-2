import { Button, Stack } from "@mui/material";

export default function CustomFormButtons({
  confirmDisabled,
  confirmVariant = "contained",
  confirmTitle = "Confirmar",
  confirmColor = "primary",
  confirmStartIcon: ConfirmStartIcon,
  confirmEndIcon: confirmEndIcon,
  cancelVariant = "outlined",
  cancelTitle = "Cancelar",
  cancelColor = "error",
  cancelStartIcon: CancelStartIcon,
  cancelEndIcon: CancelEndIcon,
  cancelAction,
}) {
  return (
    <Stack direction="row" gap={2}>
      <Button
        color={cancelColor}
        variant={cancelVariant}
        onClick={() => cancelAction && cancelAction()}
        startIcon={CancelStartIcon && <CancelStartIcon />}
        endIcon={CancelEndIcon && <CancelEndIcon />}
      >
        {cancelTitle}
      </Button>
      <Button
        type="submit"
        color={confirmColor}
        variant={confirmVariant}
        disabled={confirmDisabled}
        startIcon={ConfirmStartIcon && <ConfirmStartIcon />}
        endIcon={confirmEndIcon && <confirmEndIcon />}
      >
        {confirmTitle}
      </Button>
    </Stack>
  );
}
