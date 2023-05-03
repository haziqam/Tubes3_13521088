import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function deleteQnA(id: number) {
    const result = await prisma.questionandAnswer.delete({
        where: {
          id: id,
        },
      });

    return result;
}

try {
    deleteQnA(14)
        .then((deletedQnA) => {
            console.log(deletedQnA)
        })
}
catch (error) {
    console.error(error)
}

/**
 * 

 */
