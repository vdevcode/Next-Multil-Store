import React from "react";
import { SetupLayoutProp } from "../(root)/layout";


const AuthLayout = ({ children }: SetupLayoutProp) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default AuthLayout;
