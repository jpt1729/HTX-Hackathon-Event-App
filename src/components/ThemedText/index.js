

export default function ThemedText({
  type = "paragraph",
  icon = undefined,
  className='',
  children,
  ...props
}) {
  switch (type) {
    case "paragraph":
      return (
        <p className={`text-base leading-7 text-black ${className}`} {...props}>
          {children}
        </p>
      );
    case "heading":
      return (
        <h1 className={`text-4xl font-bold text-black ${className}`} {...props}>
          {children}
        </h1>
      );
    case "subheading":
      return (
        <h2 className={`text-2xl font-bold text-black ${className}`} {...props}>
          {children}
        </h2>
      );
    case "subtext":
      return (
        <span className={`text-gray text-base ${className}`} {...props}>
          {children}
        </span>
      );
  }
}
