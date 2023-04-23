import { QuestionAndAnswer } from "./interface";

export async function getQnA(): Promise<QuestionAndAnswer[]> {
    const res = await fetch(`http://localhost:3000/api/getQnA`);
    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }
    const data = await res.json();
    return data;
}  