const addQuestion: RegExp = /(tambahkan|input|masukkan|simpan) (pertanyaan|query) (.*) dengan (jawaban|respon) (.*) ke (dalam )?(database|basis data)/ig

const deleteQuestion: RegExp = /(hapus|hilangkan) (data |informasi )?(pertanyaan|query) (.*) dari (database|basis data)/ig

const calculator: RegExp = /^(?:[+\-*/()]|\d+)+$/

const test: string = "Tambahkan pertanyaan a dengan jawaban b ke dalam basis data";
const hapus = "Hapus pertanyaan bbbbbb dari database";
const hitung = "*10"

console.log(calculator.exec(hitung));

