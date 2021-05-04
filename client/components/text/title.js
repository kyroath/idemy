export default function Title({ color, children, className }) {
  return (
    <h1
      className={`text-3xl font-semibold text-center ${
        color ? color : "text-gray-600 dark:text-gray-100"
      } ${className ? className : ""}`}
    >
      {children}
    </h1>
  );
}
