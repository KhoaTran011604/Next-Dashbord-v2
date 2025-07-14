import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/lottiefiles/loading.json";

const LottieComponent = () => {
  return (
    <div className="w-full h-[300px] flex items-center justify-center m-auto ">
      <div className="w-[200px] ">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default LottieComponent;
