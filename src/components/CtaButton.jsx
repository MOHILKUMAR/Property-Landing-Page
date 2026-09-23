import React from "react";

const CtaButton = ({ value, href, onClick }) => {
  const className =
    "inline-block bg-accent-500 text-primary-950 font-semibold p-2 px-4 hover:bg-accent-400 rounded-lg transition-colors";

  return (
    <div>
      {href ? (
        <a href={href} onClick={onClick} className={className}>
          {value}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {value}
        </button>
      )}
    </div>
  );
};

export default CtaButton;
