import { Feature } from "../feature";

export class Help extends Feature {
    getResponse(): string {
        const response = 
        ` Selamat datang di ChatGPTdupe. Berikut panduan penggunaan fitur yang ada pada aplikasi ini.
        1. Menanyakan pertanyaan
        Anda dapat menanyakan pertanyaan pada ChatGPTdupe. Contoh:
        Apa matkul terseru?

        2. Menambahkan pertanyaan ke databse
        Untuk menambahkan pertanyaan ke database, berikut adalah beberapa masukan yang diterima:
        Tambahkan pertanyaan XXX dengan jawaban YYY ke dalam database
        Simpan query XXX dengan jawaban YYY ke database
        Masukkan pertanyaan XXX dengan respon YYY ke dalam basis data

        3. Menghapus pertanyaan dari database
        Untuk menghapus pertanyaan ke database, berikut adalah beberapa masukan yang diterima:
        Hapus pertanyaan XXX dari database
        Hilangkan informasi query XXX dari database
        Hapus data pertanyaan XXX dari basis data

        4. Kalkulator
        Anda dapat menggunakan fitur ini untuk melakukan perhitungan matematis yang melibatkan
        operator +, -, *, /, ^, (, dan ). Contoh:
        (3+5-(6/2))^3

        5. Menanyakan hari pada suatu tanggal
        Untuk menanyakan hari pada suatu tanggal, Anda dapat menggunakan format berikut
        Hari apa 03/05/1921?
        28/05/2006?
        31/01/1872
        
        Anda juga dapat menanyakan beberapa pertanyaan sekaligus dengan tanda pemisah '|'. Contoh:
        Hari apa 03/05/1921? | Simpan query XXX dengan jawaban YYY ke database |
        (3+5-(6/2))^3`
        return response;
    }
}
