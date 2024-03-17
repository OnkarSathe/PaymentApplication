import { forwardRef } from "react"; // Import forwardRef from react

export const InputBox = forwardRef(({ label, placeholder, ...rest }, ref) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        {...rest}
        ref={ref} // Pass the ref to the input element
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
});
