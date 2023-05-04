import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET') {
        try {
            const roomId = req.query.roomId;
            const chatHistory = await prisma.chatHistory.findUnique({
                where: { roomId: parseInt(roomId as string) },
                include: { messages: true }
            });
            return res.status(200).json(chatHistory);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}