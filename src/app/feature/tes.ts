import { getAllRoom, createRoom } from "../request/saveChat";
import { chatRoom } from "../algorithm/interface";

async function getRoom(): Promise<chatRoom[]>{
    const data = await getAllRoom();
    return data;
}

async function create(){
  await createRoom();
}

getRoom().then((data) => {
    console.log(data); // or update state or do something with the data
  }).catch((error) => {
    console.error(error);
  });
// console.log(getRoom.length);
// create();