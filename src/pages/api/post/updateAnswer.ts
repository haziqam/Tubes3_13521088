import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const updatedQnA = JSON.parse(req.body).param; // updatedQnA merupakan QnA yang dipass melalui NextApiRequest
            const result = await prisma.questionandAnswer.update({ 
                where: {
                    id: updatedQnA.id
                },
                data: {
                    answer: updatedQnA.newAnswer
                }
            });
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to update data', error })
        }
    } 
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
  }