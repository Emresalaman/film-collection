// Navbar bileşeni: sayfanın üstündeki navigasyon çubuğu
// Props: aktifSayfa (hangi sayfada olduğumuzu bilmek için) ve sayfaDegistir (tıklandığında çağrılır)
function Navbar({ aktifSayfa, sayfaDegistir }) {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Başlık */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <span className="text-xl font-bold tracking-wide">Film Koleksiyonu</span>
        </div>

        {/* Menü linkleri */}
        <div className="flex gap-2">
          <button
            onClick={() => sayfaDegistir('liste')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              aktifSayfa === 'liste'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Filmler
          </button>
          <button
            onClick={() => sayfaDegistir('ekle')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              aktifSayfa === 'ekle'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            + Film Ekle
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
