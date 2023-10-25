import { Dispatch, SetStateAction } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

interface AudioRecordProps {
  setAudio: (value: boolean) => void;
  setDataLoading: (value: boolean) => void;
  setSession: (value: boolean) => void;
  setEmotion: Dispatch<SetStateAction<string>>;
  setDepression: Dispatch<SetStateAction<number | undefined>>;
}

const AudioRecord: React.FC<AudioRecordProps> = ({
  setAudio,
  setDataLoading,
  setSession,
  setEmotion,
  setDepression,
}) => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = async (blob: Blob) => {
    setAudio(true);
    setDataLoading(true);
    function blobToBase64(blob: Blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    let inputs = await blobToBase64(blob);
    inputs = (inputs as string).split(",")[1];

    try {
      const data = {
        inputs: inputs,
      };

      // console.log(data.inputs);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_EMOTION_DETECTION_AUTH_TOKEN as string
        }`,
      };

      fetch(`${process.env.NEXT_PUBLIC_EMOTION_DETECTION_API as string}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data: { emotion: string; depression: number[] }) => {
          // console.log(data);
          setEmotion(data?.emotion);
          setDepression(data?.depression[0]);
          setDataLoading(false);
          setSession(true);
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.error("Error uploading the audio file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center  bg-[#FFF3E1] py-[52px] px-8 max-w-[384px] mx-auto rounded-lg w-full popup-content">
      <p className="pb-2 text-[16px] text-[#62388A] text-center">
        When you are ready push the button below and answer the question.
      </p>
      <p className="text-[16px] text-[#62388A] text-center">
        We recommended recording a minimum duration of{" "}
        <strong>60 seconds</strong> for better analysis and more accurate
        results
      </p>
      <h2 className="text-[#62388A] text-[24px] text-center leading-10 pb-[32px] pt-[12px]">
        Hey, could you please share how today went?
      </h2>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
    </div>
  );
};

export default AudioRecord;
