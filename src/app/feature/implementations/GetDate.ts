import { Feature } from "../feature";

export class GetDate extends Feature {
    private readonly date: string;

    constructor (date: string) {
        super();
        const dateSplit = date.split('/');
        const day = dateSplit[0];
        const month = dateSplit[1];
        const year = dateSplit[2];
        const dateString = `${year}-${month}-${day}`;
        this.date = dateString;
    }

    getResponse(): string {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const daysIdx = new Date(this.date).getDay();
        return "Hari " + days[daysIdx];
    }
}