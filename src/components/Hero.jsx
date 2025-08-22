'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import OrderModal from './OrderModal'

export default function Hero() {
  const product = {
    id: 'kopi-gayo-250',
    name: 'Kopi Gayo - Single Origin',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop',
    description: 'Aroma citrus & chocolate, roasted medium. Ideal for pour-over dan espresso.',
    originalPrice: 99000,
    weight: '250g'
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <section id="home" className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 lg:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium text-sm shadow-sm">
              100% Organik • Dari Petani Lokal
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Kopi Organik{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">
                Premium
              </span>{' '}
              Indonesia
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Nikmati cita rasa autentik kopi Nusantara dari biji pilihan — dipetik langsung oleh petani lokal dengan praktik organik bersertifikat.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center lg:justify-start">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-transform transform focus:outline-none focus:ring-4 focus:ring-amber-200"
                aria-haspopup="dialog"
                aria-expanded={showModal}
              >
                Pesan Sekarang
              </button>

              <Link
                href="#about"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-amber-300 bg-white/60 backdrop-blur text-amber-700 font-semibold shadow-sm hover:shadow-md transition"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-600">100%</div>
                <div className="text-sm text-gray-600">Organik</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-600">5000+</div>
                <div className="text-sm text-gray-600">Pelanggan Puas</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-600">4.8★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 blur-xl opacity-60 transform -rotate-1"></div>

              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-amber-50 hover:shadow-3xl transition-transform transform hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop"
                  alt="Kopi organik premium Indonesia"
                  width={1000}
                  height={700}
                  className="w-full h-[420px] object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium text-amber-700 shadow-sm">
                  Biji pilihan • Roast medium
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-amber-200 opacity-60 filter blur-sm"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-200 opacity-60 filter blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal 
        product={product} 
        isOpen={showModal} 
        onClose={closeModal} 
      />
    </section>
  )
}