import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const useTogglePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleEyeIconClick = () => setIsPasswordVisible((prev) => !prev);
  const EyeIconComponent = () => (
    <div
      className="hover:text-primary absolute z-10 pr-2"
      onClick={handleEyeIconClick}
      title={`${isPasswordVisible ? "Hide" : "Show"} the password`}
    >
      {isPasswordVisible ? (
        <EyeOff className="size-5" />
      ) : (
        <Eye className="size-5" />
      )}
    </div>
  );

  return {
    isPasswordVisible,
    EyeIconComponent,
  };
};
