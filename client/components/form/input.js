import Link from "next/link";
import PropTypes from "prop-types";

import { capitalize } from "../../utils/string";

export default function Input({
  id,
  label,
  type,
  placeholder,
  error,
  className,
  sideText,
  sideHref,
  value,
  setFunc
}) {
  const sideClasses = "te";

  return (
    <div>
      <div>
        <label
          className="uppercase text-sm text-gray-800 font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
        {/* Check if there's a side text and whether or not it points to somewhere */}
        {sideText ? (
          sideHref ? (
            <Link href={sideHref}>
              <a className="text-indigo-500 text-base font-normal transition-colors">
                {sideText}
              </a>
            </Link>
          ) : (
            <p className={sideClasses}>{sideText}</p>
          )
        ) : null}
      </div>
      <input
        type={type}
        id={id}
        placeholder={
          placeholder ? capitalize(placeholder, true) : capitalize(label)
        }
        value={value} // If value is not given this will not affect anything
        onChange={(e) => (setFunc ? setFunc(e.target.value) : null)} // Same as above
        className="border-gray-200 placeholder-gray-300 dark:bg-gray-900 dark:border-gray-900 rounded focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-indigo-400 focus:shadow-lg transition-shadow"
      />

      {error ? (
        <p>{error}</p>
      ) : null}
    </div>
  );
}

Input.propTypes = {
  // ID value for the <input> and for value for <label>
  id: PropTypes.string.isRequired,

  // Label text for <label>
  label: PropTypes.string.isRequired,

  // Type for <input>
  type: PropTypes.string.isRequired,

  // Placeholder value for <input>.
  // Defaults to label
  placeholder: PropTypes.string,

  // Any error messages associated with this input
  error: PropTypes.string,

  // Optional additional classes to the container
  className: PropTypes.string,

  // Value for an extra text to the side of the label
  sideText: PropTypes.string,

  // Destination if the side text is a link
  sideHref: PropTypes.string,

  // Value of the <input>
  value: PropTypes.string,

  // Set function for the value in <input>
  setFunc: PropTypes.func,
};
