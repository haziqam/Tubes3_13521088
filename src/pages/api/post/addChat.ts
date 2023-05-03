import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const addedChat = JSON.parse(req.body).param;
            const result = await prisma.Messages.create({ 
                data: {
                    question: addedChat.question,
                    answer: addedChat.answer,
                    chatHistoryRoomId: addedChat.chatHistoryRoomId
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