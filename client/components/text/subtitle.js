export default function Subtitle({ color, children, className }) {
  return (
    <h2
      className={`text-sm font-semibold text-center ${
        color ? color : "text-gray-400"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
