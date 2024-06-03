import Link from "next/link";

export default function Card({
  children,
  active = false,
  href,
  className,
  ...props
}) {
  if (href) {
    return (
      <Link href={href} className={`flex gap-3 ${className}`} {...props}>
        <div className={`min-w-1 rounded-full min-h-full ${active ? 'bg-red-accent' : 'bg-gray'}`} />
        <div className="flex flex-col gap-1">{children}</div>
      </Link>
    );
  }
  return (
    <div className={`flex gap-3 ${className}`} {...props}>
      <div className={`min-w-1 rounded-full min-h-full ${active ? 'bg-red-accent' : 'bg-gray'}`} />
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
