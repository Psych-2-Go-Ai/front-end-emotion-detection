import Link from "next/link";
import HomeIcon from "~/assets/icons/homeIcon";
import LoadingData from "./loadingData";
import PersonalDataUpload from "./personalDataUpload";
import AudioRecord from "./audioRecord";
import { Dispatch, SetStateAction, useState } from "react";

interface UserDataFn {
  name: string;
  age: number | string;
  gender: string;
}
interface OverlayProps {
  setUser: (value: UserDataFn) => void;
  setEmotion: Dispatch<SetStateAction<string>>;
  setDepression: Dispatch<SetStateAction<number | undefined>>;
}

const Overlay: React.FC<OverlayProps> = ({
  setUser,
  setEmotion,
  setDepression,
}) => {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [session, setSession] = useState<boolean>(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full overlay">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
        <Link
          href="/"
          className="overlay-btn flex gap-3 text-white items-center justify-center"
        >
          <HomeIcon /> Back to home
        </Link>
        {dataLoading ? (
          <LoadingData session={session} />
        ) : !audio ? (
          <AudioRecord
            setEmotion={setEmotion}
            setDepression={setDepression}
            setAudio={setAudio}
            setDataLoading={setDataLoading}
            setSession={setSession}
          />
        ) : (
          <PersonalDataUpload
            setUser={setUser}
            setDataLoading={setDataLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Overlay;
