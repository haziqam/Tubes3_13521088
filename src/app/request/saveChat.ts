import { Messages } from "../algorithm/interface";

/**
 * @param question Pertanyaan yang akan ditambahkan
 * @param answer Jawaban yang akan ditambahkan
 * @returns Data Messages {id, question, answer} yang berhasil ditambahkan
 */
 export async function addChat(question: string, answer: string, chatHistoryRoomId:number): Promise<Messages> {
    // Memanggil API addQnA dengan memasukkan parameter question dan answer ke dalam NextApiRequest body
    const res = await fetch(`http://localhost:3000/api/post/addChat`, {
                method: 'POST',
                body: JSON.stringify({param: 
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