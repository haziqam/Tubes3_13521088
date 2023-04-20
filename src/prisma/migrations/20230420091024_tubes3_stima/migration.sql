-- CreateTable
CREATE TABLE "QuestionandAnswer" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "QuestionandAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatHistory" (
    "chat_id" INTEGER NOT NULL,
    "sent_datetime" TIMESTAMP(3) NOT NULL,
    "questionSideText" TEXT NOT NULL,
    "answerSideText" TEXT NOT NULL,

    CONSTRAINT "chatHistory_pkey" PRIMARY KEY ("chat_id")
);
