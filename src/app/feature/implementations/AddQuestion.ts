import { Feature } from "../feature";
import { FeatureClassifier } from "../featureClassifier"
import prisma from '../prismaClient';



export class AddQuestion extends Feature {
    private readonly regexMatch: string[];

    addQuestionToDB = async () => {
        const addedQnA = await prisma.questionandAnswer.create({
            data: {
                question: this.extractQuestion(),
                answer: this.extractAnswer()
            }
            
        });
        //console.log(addedQnA);
    }

    constructor (regexMatch: string[]) {
        super();
        this.regexMatch = regexMatch;
    }

    // Extracts question from regex match
    private extractQuestion(): string {
        return this.regexMatch[3];
    }

    // Extracts answer from regex match
    private extractAnswer(): string {
        return this.regexMatch[5];
    }

    getResponse(): string {
        const question: string = this.extractQuestion();
        const answer: string = this.extractAnswer();

        let successful: boolean = true;
        /* Adds question and answser to db */
        this.addQuestionToDB()
            .catch(e => {
                console.error(e.message);
                successful = false;
            })
            .finally(async () => {
                await prisma.$disconnect();
            });

        
        if (successful) {
            return "Pertanyaan " + question + " dengan jawaban " + answer + " berhasil ditambahkan!";
        }
        else {
            return "gagal"
        }
    }
}

const userMsg = "Tambahkan pertanyaan apa matkul terseru dengan jawaban STIMA ke database";
const classsifier = new FeatureClassifier(userMsg);
const feature = classsifier.getFeature();
console.log(feature.getResponse());

