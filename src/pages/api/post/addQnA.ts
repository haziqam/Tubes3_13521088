import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const addedQnA = JSON.parse(req.body).param; // addedQnA merupakan QnA yang dipass melalui NextApiRequest
            const result = await prisma.questionandAnswer.create({ 
                data: {
                    question: addedQnA.question,
                    answer: addedQnA.answer
                }
            });
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to add data', error })
        }
    } 
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
  }