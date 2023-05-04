import { getAllRoom} from "../request/saveChat";
import { chatRoom } from "../algorithm/interface";
import { createRoom } from "../request/saveChat";
import { getRoomChatHistory } from "../request/saveChat";

// async function getRoom(): Promise<chatRoom[]>{
//     const data = await getAllRoom();
//     return data;
// }

// async function create(){
//   await createRoom();
// }

// getRoom().then((data) => {
//     console.log(data); // or update state or do something with the data
//   }).catch((error) => {
//     console.error(error);
//   });
// console.log(getRoom.length);
// create();


async function getRoom(){
  const data = await getRoomChatHistory(24);
  console.log(data.messages);
}
getRoom();