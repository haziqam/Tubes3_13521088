import { Feature } from "../feature";

export class Help extends Feature {
    getResponse(): string {
        const response = 
        ` Selamat datang di ChatGPTdupe. Berikut panduan penggunaan fitur yang ada pada aplikasi ini.\n
        1. Menanyakan pertanyaan\n
        Anda dapat menanyakan pertanyaan pada ChatGPTdupe. Contoh:\n
        Apa matkul terseru?\n\n

        2. Menambahkan pertanyaan ke databse\n
        Untuk menambahkan pertanyaan ke database, berikut adalah beberapa masukan yang diterima:\n
        Tambahkan pertanyaan XXX dengan jawaban YYY ke dalam database\n
        Simpan query XXX dengan jawaban YYY ke database\n
        Masukkan pertanyaan XXX dengan respon YYY ke dalam basis data\n\n

        3. Menghapus pertanyaan dari database\n
        Untuk menghapus pertanyaan ke database, berikut adalah beberapa masukan yang diterima:\n
        Hapus pertanyaan XXX dari database\n
        Hilangkan informasi query XXX dari database\n
        Hapus data pertanyaan XXX dari basis data\n\n

        4. Kalkulator\n
        Anda dapat menggunakan fitur ini untuk melakukan perhitungan matematis yang melibatkan\n
        operator +, -, *, /, ^, (, dan ). Contoh:\n
        (3+5-(6/2))^3\n\n

        5. Menanyakan hari pada suatu tanggal\n
        Untuk menanyakan hari pada suatu tanggal, Anda dapat menggunakan format berikut\n
        Hari apa 03/05/1921?\n
        28/05/2006?\n
        31/01/1872\n\n
        
        Anda juga dapat menanyakan beberapa pertanyaan sekaligus dengan tanda pemisah '|'. Contoh:\n
        Hari apa 03/05/1921? | Simpan query XXX dengan jawaban YYY ke database |\n
        (3+5-(6/2))^3`
        return response;
    }
}
