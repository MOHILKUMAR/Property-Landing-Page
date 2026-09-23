import React from "react";

const CtaButton = ({ value, href, onClick }) => {
  const className =
    "inline-block bg-green-500 font-mono font-medium p-2 px-4 hover:bg-green-700 hover:text-black text-white rounded-lg transition-colors";

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
