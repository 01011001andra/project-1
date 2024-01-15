import React from "react";
import loginJson from "../assets/lotties/login.json";
import { useLottie } from "lottie-react";

const LoginLottie = () => {
  const style = {
    height: 500,
  };

  const options = {
    animationData: loginJson,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default LoginLottie;
