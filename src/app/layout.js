import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { siteMetadata } from '@/lib/metadata'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: 'CoffPro',
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CoffPro',
  url: siteMetadata.url,
  logo: `${siteMetadata.url}/logo.png`,
  description: siteMetadata.description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-812-3456-7890',
    contactType: 'Customer Service'
  },
  sameAs: [
    'https://facebook.com/coffpro',
    'https://instagram.com/coffpro'
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="canonical" href={siteMetadata.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={jetbrains.className}>{children}</body>
    </html>
  )
}