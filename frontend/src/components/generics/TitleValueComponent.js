import { Stack, Typography } from "@mui/material";
import CustomLink from "./CustomLink";

export default function TitleValueComponent({
  title,
  value,
  direction = "column",
  link,
  linkAriaLabel,
}) {
  return (
    <Stack direction={direction} minWidth={0} gap={1}>
      {title && <Typography variant="h4">{title}:</Typography>}
      {value && !link && (
        <Typography variant="body1" textOverflow="ellipsis" title={value}>
          {value}
        </Typography>
      )}
      {value && link && (
        <CustomLink href={link} ariaLabel={linkAriaLabel}>
          <Typography
            variant="body1"
            textOverflow="ellipsis"
            title={value}
            color="primary"
          >
            {value}
          </Typography>
        </CustomLink>
      )}
    </Stack>
  );
}
