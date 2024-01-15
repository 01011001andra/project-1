import React from "react";
import jaketJson from "../assets/lotties/jaket.json";
import { useLottie } from "lottie-react";

const JaketLottie = () => {
  const style = {
    height: 200,
  };

  const options = {
    animationData: jaketJson,
    loop: true,
    
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default JaketLottie;
