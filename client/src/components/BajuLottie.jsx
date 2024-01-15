import React from "react";
import bajuJson from "../assets/lotties/baju.json";
import { useLottie } from "lottie-react";

const BajuLottie = () => {
  const style = {
    height: 200,
  };

  const options = {
    animationData: bajuJson,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default BajuLottie;
