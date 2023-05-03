import { getAllRoom } from "../request/saveChat";
import { chatRoom } from "../algorithm/interface";

async function getRoom(): Promise<chatRoom[]>{
    const data = await getAllRoom();
    return data;
}

getRoom().then((data) => {
    console.log(data); // or update state or do something with the data
  }).catch((error) => {
    console.error(error);
  });
  