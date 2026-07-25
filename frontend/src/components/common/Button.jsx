function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;