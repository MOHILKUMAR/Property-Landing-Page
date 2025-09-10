import React from "react";

const CtaButton = ({value}) => {
  return (
    <div>
      <button className="bg-green-500 font-mono font-medium p-2 px-4 hover:bg-green-700 hover:text-black text-white rounded-lg">
        {value}
      </button>
    </div>
  );
};

export default CtaButton;
