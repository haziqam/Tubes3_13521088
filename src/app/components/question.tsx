const Question = () => {
  return (
    <div className="grid grid-cols-12 bg-purple-200 rounded-md">
      <div className="col-span-1 bg-purple-500 mr-auto rounded-md p-2">
        <img src="/gojobot.jpg" width={30} height={30} alt="profile"/>
      </div>
      <div className="col-span-11 px-4 flex flex-col justify-center">
        <span className="text-sm text-purple-950">imagine kelar</span>
      </div>
    </div>
  );
};

export default Question;
