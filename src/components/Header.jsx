'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    function onResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Produk', href: '#products' },
    { name: 'Tentang', href: '#about' },
    { name: 'Kontak', href: '#footer' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/60 shadow-md' : 'bg-transparent'} `}
      aria-label="Main Navigation"
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-gray-900">CoffPro</span>
                <span className="text-xs -mt-1 text-gray-500 hidden md:block">Kopi Organik Premium</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 px-1 py-1"
                >
                  <span className="inline-block">{item.name}</span>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <Link
              href="#home"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg"
              aria-label="Pesan Sekarang"
            >
              Pesan Sekarang
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <Link href="#home" className="mr-3 inline-flex items-center px-3 py-1.5 rounded-md bg-amber-600 text-white text-sm font-medium shadow-sm">
              Pesan
            </Link>

            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md text-gray-700 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden transform origin-top transition-all duration-300 ${
            isMenuOpen ? 'max-h-[420px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          <div className="mt-3 pb-6 space-y-2 rounded-lg bg-white/60 backdrop-blur-md border border-white/20 shadow-lg px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-800 hover:text-amber-600 font-medium py-2"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#home"
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Pesan Sekarang
              </Link>
            </div>
            <div className="pt-3 text-xs text-gray-500">
              <div>Gratis ongkir untuk pembelian pertama</div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
