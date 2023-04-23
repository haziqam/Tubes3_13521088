import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const allQnA = await prisma.questionandAnswer.findMany()
    return res.status(200).json(allQnA)
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
