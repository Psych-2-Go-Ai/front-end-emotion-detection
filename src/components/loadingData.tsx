import Image from "next/image";
import React from "react";
import Meditation from "../assets/meditation.png";

interface LoadingDataProps {
  session: boolean;
}

const LoadingData: React.FC<LoadingDataProps> = ({ session }) => {
  return (
    <div className="flex flex-col items-center  bg-[#FFF3E1] pt-[52px] px-8 max-w-[384px] mx-auto rounded-lg w-full pb-2 popup-content">
      <h4 className="text-[#62388A] text-[16px] pb-6">
        {session ? "Beginning session" : "Analyzing..."}
      </h4>
      <h2 className="text-[#62388A] text-[24px] text-center leading-10 pb-9">
        3..2..1..
        <br />
        {session
          ? "Take a deep breath as I start your session"
          : "Take a deep breath as I analyse your emotion"}
      </h2>
      <Image src={Meditation} alt="" />
    </div>
  );
};

export default LoadingData;
