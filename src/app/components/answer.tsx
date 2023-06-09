import React from "react";

interface AnswerProps {
  response: string;
}

const Answer = ({ response }: AnswerProps) => {
  const responseWithLineBreaks = response.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return (
    <div className="grid grid-cols-12 bg-purple-300 rounded-md">
      <div className="col-span-1 bg-purple-500 mr-auto rounded-md p-2">
        <img src="/megumi.jpg" width={30} height={30} alt="profile" />
      </div>
      <div className="question col-span-11 px-4 flex flex-col justify-center">
        <span className="text-sm text-purple-950">{responseWithLineBreaks}</span>
      </div>
    </div>
  );
};

export default Answer;

