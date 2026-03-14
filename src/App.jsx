import { useState } from 'react'
import Navbar from './Components/Navbar'
import FilmListesiSayfasi from './Pages/FilmListesiSayfasi'
import FilmEkleSayfasi from './Pages/FilmEkleSayfasi'

// Başlangıç verileri: uygulama açıldığında bu filmler listede görünür
const baslangicFilmleri = [
  { id: 1, baslik: 'Inception', tur: 'Bilim Kurgu', yil: 2010, puan: 9, izlendi: true },
  { id: 2, baslik: 'The Dark Knight', tur: 'Aksiyon', yil: 2008, puan: 10, izlendi: true },
  { id: 3, baslik: 'Interstellar', tur: 'Bilim Kurgu', yil: 2014, puan: 9, izlendi: false },
]

function App() {
  // filmler state'i: tüm film listesi burada tutulur
  // useState ile oluşturulur → değiştiğinde React otomatik olarak ekranı günceller
  const [filmler, setFilmler] = useState(baslangicFilmleri)

  // aktifSayfa state'i: hangi sayfada olduğumuzu tutar ('liste' veya 'ekle')
  const [aktifSayfa, setAktifSayfa] = useState('liste')

  // ── EKLE ──────────────────────────────────────────────────────────────
  // Yeni film ekle: forma girilen veriyi alır, listeye ekler
  // Date.now() → benzersiz id üretmek için milisaniye cinsinden zaman damgası
  const filmEkle = (yeniFilm) => {
    const filmVerisi = {
      ...yeniFilm,
      id: Date.now(),
      puan: Number(yeniFilm.puan),
      yil: Number(yeniFilm.yil),
    }
    setFilmler((onceki) => [...onceki, filmVerisi])
    setAktifSayfa('liste') // Ekleme sonrası listeye geri dön
  }

  // ── SİL ───────────────────────────────────────────────────────────────
  // Verilen id'ye sahip filmi listeden çıkar
  // filter → sadece id eşleşmeyenleri tutar
  const filmSil = (id) => {
    const onay = window.confirm('Bu filmi silmek istediğine emin misin?')
    if (onay) {
      setFilmler((onceki) => onceki.filter((film) => film.id !== id))
    }
  }

  // ── GÜNCELLE ──────────────────────────────────────────────────────────
  // Var olan filmi güncelle: aynı id'li filmi bul ve yenisiyle değiştir
  // map → her filme bak, id eşleşirse güncellenmiş veriyi döndür
  const filmGuncelle = (guncellenmisFilm) => {
    setFilmler((onceki) =>
      onceki.map((film) =>
        film.id === guncellenmisFilm.id
          ? {
              ...guncellenmisFilm,
              puan: Number(guncellenmisFilm.puan),
              yil: Number(guncellenmisFilm.yil),
            }
          : film
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar her sayfada görünür */}
      <Navbar aktifSayfa={aktifSayfa} sayfaDegistir={setAktifSayfa} />

      {/* Aktif sayfaya göre ilgili bileşeni göster */}
      {aktifSayfa === 'liste' ? (
        <FilmListesiSayfasi
          filmler={filmler}
          onSil={filmSil}
          onGuncelle={filmGuncelle}
        />
      ) : (
        <FilmEkleSayfasi onEkle={filmEkle} />
      )}
    </div>
  )
}

export default App
