"use client";
import React, { useState, useEffect } from "react";
import FeatureClassifier from "./feature/featureClassifier";
import Question from "./components/question";
import { addChat, createRoom, getAllRoom, getRoomChatHistory } from "./request/saveChat";
import { chatRoom } from "./algorithm/interface";
// import { ToastContainer, toast } from 'react-toastify';

export interface Questions {
  id: number;
  text: string;
  responses: string[];
}

const Home = () => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [messages, setMessages] = useState<chatRoom>();
  const [room, setRoom] = useState<chatRoom[]>([]);
  const [roomId, setRoomId] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await getAllRoom();
      setRoom(rooms);
    };
    getRooms();
  }, []);

  async function create() {
    const newRoom = await createRoom();
    setRoomId(newRoom.roomId)
    setRoom(prevRooms => [newRoom, ...prevRooms]);
  }

  useEffect(() => {
    if(!roomId){
      return;
    }
    const getMessages = async () => {
      const messages = await getRoomChatHistory(roomId!);
      setMessages(messages);
    };
    getMessages();
  }, [roomId]);


  useEffect(() => {
    if (!messages) {
      return;
    }
    const chatHistory = messages?.messages || [];
    const newQuestions = chatHistory.map((chatHistory) => ({
      id: chatHistory.messageId,
      text: chatHistory.question,
      responses: [chatHistory.answer],
    }));
    setQuestions(newQuestions); 
  }, [messages]);
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if(!roomId){
    // //   toast.warning("Anda belum memilih ruang percakapan", {
    // //     position: toast.POSITION.TOP_CENTER,
    // // });
    //   setRoomId(1);
    // } else {
    const inputElement = event.currentTarget.elements.namedItem(
      "question"
    ) as HTMLInputElement;
    const inputArray = inputElement.value.split(" dan, ");
    const newQuestion: Questions = {
      id: questions.length + 1,
      text: inputElement.value,
      responses: ["Processing..."],
    };
    setQuestions([...questions, newQuestion]);
    setInputValue("");
    for (let i = 0; i < inputArray.length; i++) {
      const featClassifier = new FeatureClassifier(inputArray[i], algorithm);
      const feat = featClassifier.getFeature();
      const resp: string | Promise<string> = feat.getResponse();
      try {
        const response = await resp;
        if (i !== 0) {
          newQuestion.responses[newQuestion.responses.length - 1] += ", ";
          newQuestion.responses[newQuestion.responses.length - 1] += response;
        } else {
          newQuestion.responses[newQuestion.responses.length - 1] = response;
        }
      } catch (error) {
        newQuestion.responses[newQuestion.responses.length - 1] =
          "Error occurred while processing your question.";
      }
    }
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((q) => {
        if (q.id === newQuestion.id) {
          return newQuestion;
        }
        return q;
      });
      return updatedQuestions;
    });
    // roomId nya disesuaiin, terganting side bar
    await addChat(
      newQuestion.text,
      newQuestion.responses[newQuestion.responses.length - 1],
      roomId!
    );
    // }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="fixed w-screen h-screen background-color flex">
      <div className="fixed w-64 h-screen sidebar-purple">
        <div className="m-4 h-96">
        
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 w-56 text-xs font-medium text-purple-700 bg-transparent rounded-lg border border-purple-700 focus:ring-purple-500 focus:border-purple-500 block hover:border-purple-950 hover:text-purple-950"
            onClick={create}
          >
            + Percakapan Baru
          </button>
          <div className="flex-col justify-center h-64 overflow-x-hidden scroll-auto overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-600">
            {room.map((r) => (
              <div
                key={r.roomId}
                className=""
                onClick={() => setRoomId(r.roomId)}
              >
                <button
                  className={`text-left py-2.5 px-5 mr-2 mb-2 w-52 items-center h-9 text-xs font-medium rounded truncate ${
                    roomId === r.roomId
                      ? "text-white bg-purple-950"
                      : "text-purple-950"
                  }`}
                >
                  {r.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-56 h-0.5 mx-auto my-4 bg-purple-900 border-0 rounded md:my-4 dark:bg-gray-700" />
        <div className="ml-4 text-purple-950">Algoritma</div>
        <div className="">
          <div className="ml-1 flex gap-10">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                data-ripple-dark="true"
              >
                <input
                  id="html"
                  name="type"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-purple-500 text-purple-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                  onChange={() => setAlgorithm("KMP")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-purple-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer select-none text-purple-900">
                KMP
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                data-ripple-dark="true"
              >
                <input
                  id="react"
                  name="type"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-purple-500 text-purple-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                  onChange={() => setAlgorithm("BM")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-purple-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer  text-purple-900">
                BM
              </label>
            </div>
          </div>
          <div className="ml-4 text-sm text-purple-950">
          <div className="fixed bottom-2">Tubes3_13521088</div>
          </div>
        </div>
      </div>
      <div className=" ml-96 mt-5 h-5/6 w-7/12 space-y-5 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-600">
      {questions.map((q) => (
          <Question
            key={q.id}
            id={q.id}
            text={q.text}
            responses={q.responses}
          />
        ))}
        <form method="GET" onSubmit={handleSubmit}>
          <div className="fixed bottom-5 text-purple-600 w-10/12 p-2.5 flex-col">
            <label className="block text-purple-950 text-sm mb-2">
              Ketik 'help' untuk cara penggunaan
            </label>
            <div className="flex">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
