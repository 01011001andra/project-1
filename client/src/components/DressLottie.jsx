import React from "react";
import dressJson from "../assets/lotties/dress.json";
import { useLottie } from "lottie-react";

const DressLottie = () => {
  const style = {
    height: 200,
  };

  const options = {
    animationData: dressJson,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default DressLottie;
