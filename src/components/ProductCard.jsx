'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
})

function formatPrice(price) {
  return currencyFormatter.format(price)
}

function ProductCard({ product, onAddToCart }) {
  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  const productJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: Array.isArray(product.image) ? product.image : [product.image],
      brand: {
        '@type': 'Brand',
        name: 'CoffPro'
      },
      offers: {
        '@type': 'Offer',
        price: String(product.price),
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: product.url || undefined
      },
      aggregateRating: product.rating
        ? {
            '@type': 'AggregateRating',
            ratingValue: String(product.rating),
            reviewCount: String(product.reviews || 0)
          }
        : undefined
    }
  }, [product])

  return (
    <article
      aria-labelledby={`product-${product.id}-title`}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="relative">
        <div className="w-full h-64 relative">
          <Image
            src={product.image}
            alt={`${product.name} - Kopi ${product.origin} (Roast ${product.roastLevel})`}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>

        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            -{discountPercentage}%
          </div>
        )}

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2">
          <span className="text-yellow-400 text-sm" aria-hidden>
            ★
          </span>
          <span className="text-sm font-semibold">{product.rating ?? '-'}</span>
          <span className="text-xs text-gray-600">({product.reviews ?? 0})</span>
        </div>
      </div>

      <div className="p-6">
        <h3 id={`product-${product.id}-title`} className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-amber-600">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && product.originalPrice > 0 && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="text-xs text-gray-500 mt-1">Hemat {discountPercentage}% dari harga asli</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-700">
          <div>
            <div className="text-gray-500">Asal</div>
            <div className="font-semibold">{product.origin}</div>
          </div>
          <div>
            <div className="text-gray-500">Roast</div>
            <div className="font-semibold">{product.roastLevel}</div>
          </div>
          <div>
            <div className="text-gray-500">Berat</div>
            <div className="font-semibold">{product.weight}</div>
          </div>
          <div>
            <div className="text-gray-500">Rating</div>
            <div className="font-semibold">{product.rating ?? '-'}/5</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-amber-200"
            aria-label={`Tambah ${product.name} ke keranjang`}
          >
            Pesan
          </button>

          <a
            href={product.url || '#'}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold hover:bg-amber-50 transition"
          >
            Lihat
          </a>
        </div>
      </div>
    </article>
  )
}

export default React.memo(ProductCard)
