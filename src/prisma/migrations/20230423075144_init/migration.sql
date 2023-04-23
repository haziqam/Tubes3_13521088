-- CreateTable
CREATE TABLE "QuestionandAnswer" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "QuestionandAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatHistory" (
    "roomId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChatHistory_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageId" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "chatHistoryRoomId" INTEGER,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatHistory_name_key" ON "ChatHistory"("name");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatHistoryRoomId_fkey" FOREIGN KEY ("chatHistoryRoomId") REFERENCES "ChatHistory"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;
