import { ChatHistory } from "../algorithm/interface";
import prisma from "../../prisma/client"




// export async function getAllRoom(): Promise<ChatHistory[]> {
//     const res = await fetch(`http://localhost:3000/api/post/getAllRoom`);
//     if (!res.ok) {
//       throw new Error('Failed to fetch data from API');
//     }
//     const data = await res.json();
//     return data;
// }
  
  // export async function getRoomById(id: number): Promise<chatRoom> {
  //   const res = await fetch(`http://localhost:3000/api/post/getRoomById?roomId=${id}`);
  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data from API');
  //   }
  //   const room = await prisma.post.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!room) {
  //     throw new Error(`Chat room with ID ${id} not found`);
  //   }
  //   return room;
  // }
  
  
//   export async function createRoom(): Promise<ChatHistory> {
//     const chatRoom = await getAllRoom();
//     const len = chatRoom.length;
//     const res = await fetch(`http://localhost:3000/api/post/createRoom`, {
//       method: 'POST',
//       body: JSON.stringify({
//         param:
//         {
//           name: `Room ${len + 1}`,
//           messages: []
//         }
//       })
//     });
  
//     if (!res.ok) {
//       const ApiResponseMsg = await res.text();
//       throw new Error('Failed to add data using API: ' + ApiResponseMsg);
//     }
  
//     const newRoomChat = await res.json();
//     return newRoomChat;
//   }