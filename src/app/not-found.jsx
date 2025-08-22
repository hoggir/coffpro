import Link from "next/link";

export default function Custom404() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-rose-200 to-sky-300 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center backdrop-blur-2xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-10 w-[90%] max-w-lg">
        <h1 className="text-8xl font-extrabold text-black drop-shadow-lg">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-black/90">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mt-2 text-black/70">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium shadow-lg hover:opacity-90 transition-all duration-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
