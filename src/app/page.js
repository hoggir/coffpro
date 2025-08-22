import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen mocha">
      <Header />
      <Hero />
      <ProductGrid />
      <About />
      <Footer />
    </main>
  );
}
