import Image from "next/image"

export default function About() {
  const features = [
    {
      title: "100% Organik",
      description: "Ditanam tanpa pestisida dan bahan kimia berbahaya.",
      icon: "🌱"
    },
    {
      title: "Fair Trade",
      description: "Mendukung kesejahteraan petani kopi lokal Indonesia.",
      icon: "🤝"
    },
    {
      title: "Freshly Roasted",
      description: "Dipanggang segar sesuai pesanan untuk cita rasa optimal.",
      icon: "🔥"
    },
    {
      title: "Premium Quality",
      description: "Biji kopi pilihan grade A dengan standar internasional.",
      icon: "⭐"
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Mengapa Memilih <span className="text-amber-600">CoffPro?</span>
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-xl">
              Kami berkomitmen menghadirkan kopi organik premium terbaik Indonesia langsung dari kebun ke cangkir Anda.
              Semua dipilih dan diproses dengan teliti oleh petani lokal yang berpengalaman.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 text-lg">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow hover:bg-amber-700"
                aria-label="Pelajari lebih lanjut tentang CoffPro"
              >
                Pelajari Cerita Kami
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-amber-200 bg-white/60 backdrop-blur-sm text-amber-700 font-semibold shadow-sm hover:shadow-md transition"
                aria-label="Lihat produk CoffPro"
              >
                Lihat Produk
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-amber-100/60 to-orange-100/60 filter blur-3xl opacity-60 -z-10"></div>

            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-amber-50">
              <Image
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80&auto=format&fit=crop"
                alt="Petani kopi Indonesia sedang memanen biji kopi organik premium"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                width={900}
                height={700}
              />
            </div>

            <div className="absolute -bottom-8 -right-0 bg-white/30 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-amber-700 shadow">
              Dari kebun lokal • Single Origin
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
