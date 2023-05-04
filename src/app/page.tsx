'use client';
import React, { useState } from "react";
import axios from "axios";
import FeatureClassifier from "./feature/featureClassifier";
import SideBar from "./components/sideBar";
import Answer from "./components/answer";
import Question from "./components/question";
import Search from "./components/search";
import { addChat } from "./request/saveChat";

export interface Questions {
  id: number;
  text: string;
  responses: string[];
}

const Home = () => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = event.currentTarget.elements.namedItem(
      "question"
    ) as HTMLInputElement;
    // algorithm nya disesuaiin, terganting side bar
    const inputArray = (inputElement.value).split('dan');
    let response = "";
    for (let i = 0; i < inputArray.length; i++){
      const featClassifier = new FeatureClassifier(inputArray[i], "KMP");
      const feat = featClassifier.getFeature();
      const resp = await feat.getResponse();
      if (i != 0) response += ", ";
      response += resp;
      // const resp: string | Promise<string> = feat.getResponse();
      // if(typeof (resp) === 'string'){
      //   if (i != 0) response += ", ";
      //   response += resp;
      // }
      // else{
      //   if (i != 0) response += ", ";
      //   response += await resp;
      // }
    };
    const newQuestion: Questions = {
      id: questions.length + 1,
      text: inputElement.value,
      responses: [response],
    };
    // roomId nya disesuaiin, terganting side bar
    await addChat(inputElement.value, response, 1);
    setQuestions([...questions, newQuestion]);
    setInputValue("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="fixed w-screen h-screen background-color flex">
      <SideBar />
      <div className="fixed ml-96 mt-5 h-screen w-7/12 space-y-3">
      {questions.map((q) => (
          <Question
            key={q.id}
            id={q.id}
            text={q.text}
            responses={q.responses}
          />
        ))}
        <form method="GET" onSubmit={handleSubmit}>
          <div className="fixed bottom-5 text-purple-600 w-10/12 p-2.5 flex">
            <input
              type="text"
              name="question"
              className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg block w-8/12 p-2.5"
              placeholder="Ask gojo anything..."
              value={inputValue}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white ml-2 rounded-lg px-3 py-1"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
