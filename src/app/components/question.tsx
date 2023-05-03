'use client';
import { Questions } from "../page";
import { useState } from "react";
import Answer from "./answer";

const Question = ({ id, text, responses }: Questions) => {

  return (
    <>
    <div className="grid grid-cols-12 bg-purple-200 rounded-md">
      <div className="col-span-1 bg-purple-500 mr-auto rounded-md p-2">
        <img src="/gojobot.jpg" width={30} height={30} alt="profile" />
      </div>
      <div className="col-span-11 px-4 flex flex-col justify-center">
        <span className="text-sm text-purple-950">{text}</span>
      </div>
    </div>
    <div>
      {responses.map((response, index) => (
          <div key={index}>
            <Answer response={response} />
          </div>
      ))}
    </div>
    </>
  );
};


export default Question;
