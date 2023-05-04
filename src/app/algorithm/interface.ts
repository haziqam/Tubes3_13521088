export interface QuestionAndAnswer {
    id: number,
    question: string,
    answer: string,
}

export interface foundQuestion{
    question: number,
    percentage: number,
}

export interface BMSolution{
    question: string, 
    answer: string,
    found: number,
}

export interface Messages {
    messageId: number,
    question: string,
    answer: string,
    chatHistoryRoomId: number
}  

export interface chatRoom{
    roomId: number,
    name: string,
    messages: Messages[]
}