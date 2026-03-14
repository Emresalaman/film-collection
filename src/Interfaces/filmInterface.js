/**
 * Film nesnesi şablonu (Interface)
 *
 * Her film şu alanları içerir:
 * @property {number}  id        - Benzersiz kimlik numarası
 * @property {string}  baslik    - Filmin adı
 * @property {string}  tur       - Film türü (Aksiyon, Komedi, Drama vb.)
 * @property {number}  yil       - Yapım yılı
 * @property {number}  puan      - 1-10 arası kişisel puan
 * @property {boolean} izlendi   - İzlenip izlenmediği
 */
export const filmSablonu = {
  id: 0,
  baslik: '',
  tur: '',
  yil: new Date().getFullYear(),
  puan: 5,
  izlendi: false,
}

// Film türleri listesi
export const filmTurleri = [
  'Aksiyon',
  'Animasyon',
  'Belgesel',
  'Bilim Kurgu',
  'Dram',
  'Gerilim',
  'Komedi',
  'Korku',
  'Romantik',
]
