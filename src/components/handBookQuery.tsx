import { useEffect, useRef } from "react";
interface handBook {
  question: string;
  answer: string;
}
interface HandBookQueriesFnProps {
  handBookQueries: handBook[];
}

const HandBookQueriesFn: React.FC<HandBookQueriesFnProps> = ({
  handBookQueries,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [handBookQueries]);

  return (
    <div
      className={`main-chat bg-[#FFF3E1] rounded-lg ${
        handBookQueries.length ? "" : "flex items-center"
      }`}
    >
      {handBookQueries.length ? (
        handBookQueries.map((item, i) => (
          <div className="answer flex flex-col w-full" key={i}>
            {item.question && (
              <h3 className="ques font-normal text-[15px] px-[24px]  text-[#62388A] gap-[16px] bg-white py-6 flex ">
                <span className="bg-[#FFA441] min-w-[32px] w-[32px] min-h-[32px] h-[32px] rounded-full mt-[-5px]"></span>
                <span>{item.question}</span>
              </h3>
            )}
            <p className="ans font-normal text-[15px] px-[24px]  text-[#62388A] gap-[16px] py-6 flex">
              <span className="bg-[#62388A] min-w-[32px] w-[32px] min-h-[32px] h-[32px] rounded-full"></span>
              <span>{item.answer}</span>
            </p>
          </div>
        ))
      ) : (
        <div className="lds-ring mx-auto">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default HandBookQueriesFn;
