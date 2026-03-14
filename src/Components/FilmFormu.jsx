import { useState, useEffect } from 'react'
import { filmSablonu, filmTurleri } from '../Interfaces/filmInterface'

// FilmFormu bileşeni: hem yeni film eklemek hem de var olanı düzenlemek için kullanılır
// Props:
//   duzenlenecekFilm → eğer varsa güncelleme moduna geçer, yoksa yeni ekleme modu
//   onKaydet         → form gönderildiğinde çağrılır
//   onIptal          → iptal butonuna tıklandığında çağrılır

function FilmFormu({ duzenlenecekFilm, onKaydet, onIptal }) {
  // useState: bileşenin bellediği değişkenler.
  // form değerleri burada tutulur, her değiştiğinde bileşen yeniden render edilir.
  const [form, setForm] = useState(filmSablonu)

  // useEffect: düzenlenecekFilm değiştiğinde formu doldur
  // Bağımlılık dizisi [duzenlenecekFilm] → sadece bu değer değiştiğinde çalışır
  useEffect(() => {
    if (duzenlenecekFilm) {
      setForm(duzenlenecekFilm)
    } else {
      setForm(filmSablonu)
    }
  }, [duzenlenecekFilm])

  // Input değiştiğinde formu güncelle
  // [e.target.name]: dinamik alan adı — hangi input değişti ise onu günceller
  const handleDegisim = (e) => {
    const { name, value, type, checked } = e.target
    setForm((onceki) => ({
      ...onceki,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Form gönderildiğinde
  const handleGonder = (e) => {
    e.preventDefault() // Sayfanın yenilenmesini engeller

    if (!form.baslik.trim()) {
      alert('Lütfen film adını girin.')
      return
    }

    onKaydet(form)
  }

  const guncellemeModu = !!duzenlenecekFilm

  return (
    <form
      onSubmit={handleGonder}
      className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {guncellemeModu ? '✏️ Filmi Düzenle' : '🎬 Yeni Film Ekle'}
      </h2>

      {/* Film adı */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Film Adı *</label>
        <input
          type="text"
          name="baslik"
          value={form.baslik}
          onChange={handleDegisim}
          placeholder="Örn: Inception"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Tür ve Yıl yan yana */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tür</label>
          <select
            name="tur"
            value={form.tur}
            onChange={handleDegisim}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seç...</option>
            {filmTurleri.map((tur) => (
              <option key={tur} value={tur}>
                {tur}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Yıl</label>
          <input
            type="number"
            name="yil"
            value={form.yil}
            onChange={handleDegisim}
            min="1900"
            max="2030"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Puan */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Puan: <span className="font-bold text-blue-600">{form.puan}/10</span>
        </label>
        <input
          type="range"
          name="puan"
          value={form.puan}
          onChange={handleDegisim}
          min="1"
          max="10"
          className="accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {/* İzlendi checkbox */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="izlendi"
          checked={form.izlendi}
          onChange={handleDegisim}
          className="w-4 h-4 accent-blue-600"
        />
        <span className="text-sm text-gray-700">Bu filmi izledim</span>
      </label>

      {/* Butonlar */}
      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {guncellemeModu ? 'Güncelle' : 'Ekle'}
        </button>
        {onIptal && (
          <button
            type="button"
            onClick={onIptal}
            className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  )
}

export default FilmFormu
