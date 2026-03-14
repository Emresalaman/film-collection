import FilmFormu from '../Components/FilmFormu'

// FilmEkleSayfasi: yeni film ekleme sayfası
// Props:
//   onEkle → yeni film kaydedildiğinde çağrılır, Liste sayfasına geçiş yapar

function FilmEkleSayfasi({ onEkle }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Koleksiyona Film Ekle</h1>
        <p className="text-gray-500 mt-1">İzlediğin veya izlemek istediğin filmi ekle</p>
      </div>

      {/* FilmFormu bileşenini burada kullanıyoruz */}
      {/* duzenlenecekFilm verilmediği için "Ekle" modunda açılır */}
      <FilmFormu onKaydet={onEkle} />
    </div>
  )
}

export default FilmEkleSayfasi
