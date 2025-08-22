'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function generateInvoiceId() {
  return `CP-${Date.now().toString(36).toUpperCase().slice(0, 10)}`
}

export default function OrderModal({ product, isOpen, onClose }) {
  const [step, setStep] = useState('review')
  const [qty, setQty] = useState(1)
  const [invoiceId, setInvoiceId] = useState('')
  const [remaining, setRemaining] = useState(0)
  const [amount, setAmount] = useState(product?.price || 0)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQty(1)
      setStep('review')
      setAmount(product?.originalPrice || 0)
      setEmail('')
      setEmailError('')
      setInfoMessage('')
      setInvoiceId('')
      setRemaining(0)
    }
  }, [isOpen, product?.originalPrice])

  const validateEmail = (value) => {
    if (!value) return 'Email wajib diisi'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value) ? '' : 'Format email tidak valid'
  }

  const proceedToPayment = useCallback(() => {
    const err = validateEmail(email)
    setEmailError(err)
    if (err) return
    const id = generateInvoiceId()
    setInvoiceId(id)
    setAmount(product.originalPrice * qty)
    setRemaining(15 * 60)
    setStep('payment')
    setInfoMessage('')
  }, [email, product?.originalPrice, qty])

  useEffect(() => {
    if (!isOpen || step !== 'payment') return
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isOpen, step])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement
    requestAnimationFrame(() => {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable && focusable.length) focusable[0].focus()
    })

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      if (prev && prev instanceof HTMLElement) prev.focus()
    }
  }, [isOpen, onClose])

  const formatRupiah = (v) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v)

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  const qrData = `QRIS|${invoiceId}|${amount}`
  const qrUrl = invoiceId ? `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(qrData)}` : ''

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={!isOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-[92%] max-w-2xl mx-auto rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-black/5 transform transition-all duration-300 animate-modal-in"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
              {step === 'review' ? 'Konfirmasi Pesanan' : 'Pembayaran - QRIS'}
            </h3>
            <p className="text-sm text-gray-600">
              {step === 'review'
                ? ''
                : `Scan QR untuk menyelesaikan pembayaran.`}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-200"
              aria-label="Tutup dialog"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-3">
          {step === 'review' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="w-[180px] h-[180px] rounded-xl overflow-hidden shadow">
                  <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between gap-4">

                  <div>
                    <div className="text-sm text-gray-500">Harga / pcs</div>
                    <div className="font-semibold text-amber-600">{formatRupiah(product.originalPrice)}</div>
                  </div>

                  <div>
                    <div className="mt-1 inline-flex items-center rounded-md border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-gray-700"
                        aria-label="Kurangi jumlah"
                      >
                        −
                      </button>
                      <div className="px-4 py-2 font-medium">{qty}</div>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="px-3 py-2 text-gray-700"
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError(validateEmail(e.target.value))
                      }}
                      onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                      placeholder="nama@contoh.com"
                      className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                        emailError ? 'border-red-400' : 'border-gray-200'
                      }`}
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? 'email-error' : undefined}
                    />
                  </div>
                  {emailError && (
                    <p id="email-error" className="mt-2 text-sm text-red-600">
                      {emailError}
                    </p>
                  )}
                  {infoMessage && <p className="mt-2 text-sm text-green-600">{infoMessage}</p>}
                  <p className="mt-3 text-xs text-gray-500">
                    Kami akan menghubungi email Anda setelah pembayaran berhasil.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={proceedToPayment}
                    className="w-50 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow hover:bg-amber-700"
                  >
                    Lanjut
                  </button>

                  <button
                    onClick={onClose}
                    className="w-50 inline-flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 flex flex-col items-center gap-4">
                <div className="rounded-xl overflow-hidden bg-white p-3 shadow-sm">
                  <Image
                    src={qrUrl}
                    alt={`QRIS untuk invoice ${invoiceId}`}
                    width={320}
                    height={320}
                    className="w-[220px] h-[220px] object-contain block"
                  />
                </div>

                <div className="flex gap-2">
                  <a target="_blank" href={qrUrl} download={`${invoiceId}-qris.png`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50">
                    ⬇️ Download
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Nominal</div>
                  <div className="text-2xl font-bold text-amber-600">{formatRupiah(amount)}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500">Waktu tersisa</div>
                  <div className="text-lg font-semibold text-gray-800">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
                  {remaining === 0 && <div className="mt-2 text-sm text-red-600">Waktu transaksi telah habis. Silakan ulang dari awal.</div>}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      alert('Terimakasih — pembayaran akan diverifikasi dan Anda akan dihubungi melalui email.')
                      onClose()
                    }}
                    disabled={remaining === 0}
                    className={`flex-1 inline-flex items-center justify-center px-4 py-3 rounded-lg text-white font-semibold shadow ${
                      remaining === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    Saya Sudah Bayar
                  </button>

                  <button onClick={() => setStep('review')} className="inline-flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">
                    Batal
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Kami akan menghubungi Anda di <span className="font-medium">{email}</span>.
                </p>

                {infoMessage && <p className="mt-2 text-sm text-green-600">{infoMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-in { animation: modalIn 220ms ease-out; }
      `}</style>
    </div>
  )
}