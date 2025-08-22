import ProductCard from './ProductCard'
import productsData from '@/data/products.json'

export default function ProductGrid({ limit }) {
  const products = limit ? productsData.products.slice(0, limit) : productsData.products

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Koleksi Kopi Premium Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilihan terbaik kopi Indonesia dari berbagai daerah dengan kualitas premium dan cita rasa yang tak terlupakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/products" className="inline-flex items-center px-6 py-3 rounded-xl border border-amber-300 bg-white/60 backdrop-blur-sm text-amber-700 font-semibold shadow-sm hover:shadow-md transition">
            Lihat Semua Produk
          </a>
        </div>
      </div>
    </section>
  )
}
