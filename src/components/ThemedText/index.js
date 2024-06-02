

export default function ThemedText({
  type = "paragraph",
  icon = undefined,
  children,
}) {
  switch (type) {
    case "paragraph":
      return (
        <p className="text-base leading-7 text-black">
          <span className="material-symbols-outlined">{ icon }</span>
          {children}
        </p>
      );
    case "heading":
      return (
        <h1 className="text-4xl font-bold text-black">
          <span className="material-symbols-outlined">{ icon }</span>
          {children}
        </h1>
      );
    case "subheading":
      return (
        <h2 className="text-2xl font-bold text-black">
          <span className="material-symbols-outlined">{ icon }</span>
          {children}
        </h2>
      );
    case "subtext":
      return (
        <span className="text-gray text-base">
          <span className="material-symbols-outlined">{ icon }</span>
          {children}
        </span>
      );
  }
}
