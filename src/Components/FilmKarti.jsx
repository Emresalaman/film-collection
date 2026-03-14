// FilmKarti bileşeni: her filmi bir kart olarak gösterir
// Props:
//   film       → gösterilecek film verisi
//   onSil      → sil butonuna tıklandığında çağrılır
//   onDuzenle  → düzenle butonuna tıklandığında çağrılır

function FilmKarti({ film, onSil, onDuzenle }) {
  // Yıldız göstergesi: puan/2 = 5 üzerinden yıldız sayısı
  const yildizlar = Math.round(film.puan / 2)

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow border border-gray-100">
      {/* Üst kısım: başlık + izlendi rozeti */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-lg text-gray-800 leading-tight">{film.baslik}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
            film.izlendi
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {film.izlendi ? '✓ İzlendi' : '⏳ İzlenecek'}
        </span>
      </div>

      {/* Orta kısım: tür, yıl, puan */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">{film.tur}</span>
        <span className="bg-gray-50 px-2 py-0.5 rounded-md">{film.yil}</span>
        <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md">
          {'★'.repeat(yildizlar)}{'☆'.repeat(5 - yildizlar)} {film.puan}/10
        </span>
      </div>

      {/* Alt kısım: butonlar */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onDuzenle(film)}
          className="flex-1 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
        >
          ✏️ Düzenle
        </button>
        <button
          onClick={() => onSil(film.id)}
          className="flex-1 py-1.5 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  )
}

export default FilmKarti
