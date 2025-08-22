import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    produk: [
      { name: 'Arabica Premium', href: '/produk/arabica' },
      { name: 'Robusta Heritage', href: '/produk/robusta' },
      { name: 'Blend Nusantara', href: '/produk/blend' },
      { name: 'Paket Gift', href: '/produk/gift' }
    ],
    perusahaan: [
      { name: 'Tentang Kami', href: '/tentang' },
      { name: 'Blog', href: '/blog' },
      { name: 'Karir', href: '/karir' },
      { name: 'Kontak', href: '/kontak' }
    ],
    bantuan: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Cara Pemesanan', href: '/cara-pesan' },
      { name: 'Kebijakan Return', href: '/return-policy' },
      { name: 'Syarat & Ketentuan', href: '/terms' }
    ]
  }

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-2xl font-bold">CoffPro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Menghadirkan kopi organik premium terbaik Indonesia langsung dari petani lokal 
              ke cangkir Anda dengan cinta dan dedikasi.
            </p>
            <div className="flex space-x-4">
              <a target= "_blank" href="https://facebook.com/coffpro" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a target= "_blank" href="https://instagram.com/coffpro" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.851 14.81 3.29 13.549 3.29 12.017c0-1.533.561-2.794 1.836-3.675c.875-.807 2.026-1.297 3.323-1.297c1.297 0 2.448.49 3.323 1.297c1.275.881 1.836 2.142 1.836 3.675c0 1.532-.561 2.793-1.836 3.674c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.948h-1.674V5.897h1.674v1.143zm-.881 1.332c-.441-.441-.881-.661-1.554-.661c-.661 0-1.113.22-1.554.661c-.441.441-.661.993-.661 1.674s.22 1.233.661 1.674c.441.441.892.661 1.554.661c.661 0 1.113-.22 1.554-.661c.441-.441.661-.993.661-1.674s-.22-1.233-.661-1.674z"/>
                </svg>
              </a>
              <a target= "_blank" href="https://wa.me/6666666" className="text-gray-400 hover:text-white transition-colors" aria-label="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Produk</h3>
            <ul className="space-y-2">
              {footerLinks.produk.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} CoffPro. Semua hak dilindungi undang-undang.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}