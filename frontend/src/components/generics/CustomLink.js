import Link from "next/link";

export default function CustomLink({ href, target = "_self", children }) {
  return (
    <Link
      href={href}
      target={target}
      style={{ color: "#000", textDecoration: "none", width: "fit-content" }}
    >
      {children}
    </Link>
  );
}
