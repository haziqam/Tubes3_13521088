import { Messages, chatRoom } from "../algorithm/interface";

export async function getAllRoom(): Promise<chatRoom[]> {
  const res = await fetch(`http://localhost:3000/api/post/getRoom`);
  if (!res.ok) {
    throw new Error('Failed to fetch data from API');
  }
  const data = await res.json();
  return data;
}

export async function getRoomChatHistory(roomId: number): Promise<chatRoom>{
  const res = await fetch(`http://localhost:3000/api/post/getChatHistory?roomId=${roomId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data from API');
  }
  const data = await res.json();
  return data;
}


export async function createRoom(): Promise<chatRoom> {
  const chatRoom = await getAllRoom();
  const len = chatRoom.length;
  const res = await fetch(`http://localhost:3000/api/post/createRoom`, {
    method: 'POST',
    body: JSON.stringify({
      
        name: `Room ${len + 1}`
      
    })
  });

  if (!res.ok) {
    const ApiResponseMsg = await res.text();
    throw new Error('Failed to add data using API: ' + ApiResponseMsg);
  }

  const newRoomChat = await res.json();
  return newRoomChat;
}
/**
 * @param question Pertanyaan yang akan ditambahkan
 * @param answer Jawaban yang akan ditambahkan
 * @returns Data Messages {id, question, answer} yang berhasil ditambahkan
 */
export async function addChat(question: string, answer: string, chatHistoryRoomId: number): Promise<Messages> {
  // Memanggil API addQnA dengan memasukkan parameter question dan answer ke dalam NextApiRequest body
  const res = await fetch(`http://localhost:3000/api/post/addChat`, {
    method: 'POST',
    body: JSON.stringify({
      param:
      {
        question: question,
        answer: answer,
        chatHistoryRoomId: chatHistoryRoomId
      }
    })
  });

  if (!res.ok) {
    const ApiResponseMsg = await res.text();
    throw new Error('Failed to add data using API: ' + ApiResponseMsg);
  }

  const addedChat = await res.json();
  return addedChat;
}
