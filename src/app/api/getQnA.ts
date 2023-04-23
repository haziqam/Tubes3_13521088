import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../prisma/client'

type Data = {
    id: Int8Array,
    question: String,
    answer: String,

}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const data = await prisma.questionandAnswer.findMany()
        return res.status(200).json(data)
    } catch(error){
        return res.status(500).json(error)
    }
}