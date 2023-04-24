import SideBar from "../pages/api/components/sideBar";
import Question from "../pages/api/components/question";
import Answer from "../pages/api/components/answer";
import Search from "../pages/api/components/search";
import { GetServerSideProps } from "next";
import prisma from "../prisma/client";
import { useRouter } from "next/router";


const Home = ({ chatHistory }: HomeProps) => {
  console.log("tes")
  return (
    <div className="fixed w-screen h-screen background-color flex">
      <SideBar />
      <div className="fixed ml-96 mt-5 h-screen w-7/12 space-y-3">
        <Question />
        <Answer />
        <Search roomId={chatHistory} />
      </div>
    </div>
  );
};

export default Home;


