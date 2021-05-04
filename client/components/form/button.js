import { capitalize } from "../../utils/string";

export default function Button({ color, text, type, className, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        color ? color : "bg-green-500"
      } text-white py-2 rounded cursor-pointer w-16 transform hover:-translate-y-1 hover:shadow-lg hover:bg-green-400 transition-all ease-out focus:outline-none ${className}`}
    >
      {capitalize(text)}
    </button>
  );
}
