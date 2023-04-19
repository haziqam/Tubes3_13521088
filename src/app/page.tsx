import SideBar from "./components/sideBar";
import Question from "./components/question";
import Answer from "./components/answer";

export default function Home() {
  return (
    <div className="fixed w-screen h-screen background-color flex">
      <SideBar />
      <div className="fixed ml-96 mt-5 h-screen w-7/12 space-y-3">
      <Question />
      <Answer />
      <form method="GET">
        <div className="fixed bottom-5 text-purple-600 w-10/12 p-2.5">
            <button type="submit">
            </button>
        <input type="text" className="bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg block w-8/12 p-2.5" placeholder="Ask gojo anything..."/>
        </div>
  </form>
        </div>
      </div>
  );
}
