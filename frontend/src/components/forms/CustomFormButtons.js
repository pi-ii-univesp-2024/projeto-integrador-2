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
  justifyContent = 'flex-start'
}) {
  return (
    <Stack direction="row" justifyContent={justifyContent} gap={2}>
      {cancelAction && (
        <Button
          color={cancelColor}
          variant={cancelVariant}
          onClick={() => cancelAction && cancelAction()}
          startIcon={CancelStartIcon && <CancelStartIcon />}
          endIcon={CancelEndIcon && <CancelEndIcon />}
        >
          {cancelTitle}
        </Button>
      )}
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
