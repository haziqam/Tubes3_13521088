import { QuestionAndAnswer } from "../algorithm/interface";

export async function getQnA(): Promise<QuestionAndAnswer[]> {
  const res = await fetch(`/api/post/getQnA`);
  if (!res.ok) {
    throw new Error('Failed to fetch data from API');
  }
  const data = await res.json();
  return data;
}  


/**
 * @param question Pertanyaan yang akan ditambahkan
 * @param answer Jawaban yang akan ditambahkan
 * @returns Data QuestionAndAnswer {id, question, answer} yang berhasil ditambahkan
 */
export async function addQnA(question: string, answer: string): Promise<QuestionAndAnswer> {
  // Memanggil API addQnA dengan memasukkan parameter question dan answer ke dalam NextApiRequest body
  const res = await fetch(`/api/post/addQnA`, {
              method: 'POST',
              body: JSON.stringify({param: 
                {
                  question: question,
                  answer: answer
                }
              })
  });

  if (!res.ok) {
    const ApiResponseMsg = await res.text();
    throw new Error('Failed to add data using API: ' + ApiResponseMsg);
  }

  const addedQnA = await res.json();
  return addedQnA;
}


export async function updateAnswer(id: number, newAnswer: string): Promise<QuestionAndAnswer> {
    // Memanggil API updateAnswer dengan memasukkan parameter id dan newAnswer ke dalam NextApiRequest body
    const res = await fetch(`/api/post/updateAnswer`, {
      method: 'PUT',
      body: JSON.stringify({param: 
        {
          id: id,
          newAnswer: newAnswer
        }
      })  
    });

    if (!res.ok) {
      const ApiResponseMsg = await res.text();
      throw new Error('Failed to update data using API: ' + ApiResponseMsg);
    }

    const updatedQnA = await res.json();
    return updatedQnA;
}



export async function deleteQnA(id: number): Promise<QuestionAndAnswer> {
    // Memanggil API deleteAnswer dengan memasukkan parameter id dan newAnswer ke dalam NextApiRequest body
    const res = await fetch(`/api/post/deleteQnA`, {
      method: 'PUT',
      body: JSON.stringify({param: 
        {
          id: id
        }
      })  
    });

    if (!res.ok) {
      const ApiResponseMsg = await res.text();
      throw new Error('Failed to delete data using API: ' + ApiResponseMsg);
    }

    const deletedQnA = await res.json();
    return deletedQnA;
}



// let test: QuestionAndAnswer[];
// getQnA().then((allQnA) => {
//   test = allQnA;
//   console.log(test);
// })

// try {
//   updateAnswer(10, "hhhhhhhhh")
//     .then((updatedAnswer) => {
//       console.log(updatedAnswer)
//     })
// }
// catch (error) {
//   console.log(error)
// }

// try {
//   addQnA("asdf", "jkl;")
//     .then((addedData) => {
//       console.log(addedData);
//     });
// }
// catch (error) {
//   console.error(error);
// };

// try {
//   deleteQnA(1)
//     .then((deletedData) => {
//       console.log(deletedData);
//     })
// }
// catch (error) {
//   console.error(error);
// };

