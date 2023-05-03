import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET') {
      try {
        const allRoom = await prisma.chatHistory.findMany({
          include: {
            messages:true,
          },
          orderBy: {
            roomId: "desc",
          },
        });
        return res.status(200).json(allRoom);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }
  