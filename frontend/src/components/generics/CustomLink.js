import Link from "next/link";

export default function CustomLink({
  href,
  target = "_self",
  ariaLabel,
  children,
}) {
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      style={{ color: "#000", textDecoration: "none", width: "fit-content" }}
    >
      {children}
    </Link>
  );
}
