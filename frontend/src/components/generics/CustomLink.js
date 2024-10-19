import Link from "next/link";

export default function CustomLink({ href, children }) {
  return (
    <Link href={href} style={{ color: "#000", textDecoration: "none", width: 'fit-content' }}>
      {children}
    </Link>
  );
}
