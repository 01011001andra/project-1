import React from "react";
import hangerJson from "../assets/lotties/hanger.json";
import { useLottie } from "lottie-react";

const HangerLottie = () => {
  const style = {
    height: 200,
  };

  const options = {
    animationData: hangerJson,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default HangerLottie;
