import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      try {
        const name = JSON.parse(req.body).name;
        const newRoom = await prisma.chatHistory.create({
          data: {
            name,
          },
        });
        return res.status(200).json(newRoom);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: `Failed to create chat room: ${err}` });
      }
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
  