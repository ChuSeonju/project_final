import React from "react";
import "./Button.css";

const Button = ({ onChange, onClick, children, onSubmit }) => {
  return (
    <div>
      <button
        onChange={onChange}
        onClick={onClick}
        onSubmit={onSubmit}
        className="button"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

// 스타일 적용
