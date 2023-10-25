const AlertData = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 pe-10 py-3 rounded fixed z-[999] top-[30px] right-[30px]"
      role="alert"
    >
      <strong className="font-normal">{errorMessage}</strong>
    </div>
  );
};

export default AlertData;
