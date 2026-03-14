import { useState } from 'react'
import FilmKarti from '../Components/FilmKarti'
import FilmFormu from '../Components/FilmFormu'

// FilmListesiSayfasi: tüm filmlerin listelendiği ana sayfa
// Props:
//   filmler       → tüm film dizisi
//   onSil         → film silme fonksiyonu
//   onGuncelle    → film güncelleme fonksiyonu

function FilmListesiSayfasi({ filmler, onSil, onGuncelle }) {
  // Hangi filmin düzenleneceği (null ise düzenleme modu kapalı)
  const [duzenlenecek, setDuzenlenecek] = useState(null)
  // Arama ve filtre
  const [arama, setArama] = useState('')
  const [turFiltre, setTurFiltre] = useState('Tümü')
  const [durumFiltre, setDurumFiltre] = useState('Tümü')

  // Düzenlemeyi kaydet
  const handleGuncelle = (guncellenmisFilm) => {
    onGuncelle(guncellenmisFilm)
    setDuzenlenecek(null)
  }

  // Filtrelenmiş film listesi
  const filtreliFilmler = filmler.filter((film) => {
    const aramaUyumu = film.baslik.toLowerCase().includes(arama.toLowerCase())
    const turUyumu = turFiltre === 'Tümü' || film.tur === turFiltre
    const durumUyumu =
      durumFiltre === 'Tümü' ||
      (durumFiltre === 'İzlendi' && film.izlendi) ||
      (durumFiltre === 'İzlenecek' && !film.izlendi)
    return aramaUyumu && turUyumu && durumUyumu
  })

  // Mevcut türleri dinamik olarak bul
  const mevcutTurler = ['Tümü', ...new Set(filmler.map((f) => f.tur).filter(Boolean))]

  // İstatistikler
  const izlenenSayisi = filmler.filter((f) => f.izlendi).length
  const ortPuan =
    filmler.length > 0
      ? (filmler.reduce((t, f) => t + Number(f.puan), 0) / filmler.length).toFixed(1)
      : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">

      {/* İstatistik kartları */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{filmler.length}</div>
          <div className="text-sm opacity-80 mt-1">Toplam Film</div>
        </div>
        <div className="bg-green-600 text-white rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{izlenenSayisi}</div>
          <div className="text-sm opacity-80 mt-1">İzlenen</div>
        </div>
        <div className="bg-orange-500 text-white rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{ortPuan}</div>
          <div className="text-sm opacity-80 mt-1">Ort. Puan</div>
        </div>
      </div>

      {/* Arama ve filtreler */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center border border-gray-100">
        <input
          type="text"
          placeholder="🔍 Film ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="flex-1 min-w-40 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={turFiltre}
          onChange={(e) => setTurFiltre(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {mevcutTurler.map((tur) => (
            <option key={tur} value={tur}>{tur}</option>
          ))}
        </select>
        <select
          value={durumFiltre}
          onChange={(e) => setDurumFiltre(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Tümü</option>
          <option>İzlendi</option>
          <option>İzlenecek</option>
        </select>
      </div>

      {/* Düzenleme formu (seçili film varsa göster) */}
      {duzenlenecek && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700 font-medium mb-3">
            ✏️ Düzenleme modu: <strong>{duzenlenecek.baslik}</strong>
          </p>
          <FilmFormu
            duzenlenecekFilm={duzenlenecek}
            onKaydet={handleGuncelle}
            onIptal={() => setDuzenlenecek(null)}
          />
        </div>
      )}

      {/* Film listesi */}
      {filtreliFilmler.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🎬</div>
          <p className="text-lg">
            {filmler.length === 0
              ? 'Henüz film eklenmedi. "Film Ekle" ile başla!'
              : 'Arama kriterlerine uyan film bulunamadı.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">{filtreliFilmler.length} film gösteriliyor</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtreliFilmler.map((film) => (
              <FilmKarti
                key={film.id}
                film={film}
                onSil={onSil}
                onDuzenle={setDuzenlenecek}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FilmListesiSayfasi
