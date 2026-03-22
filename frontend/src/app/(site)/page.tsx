import TopBar from "@/components/pagina/TopBar/topbar";
import Header from "@/components/pagina/Header/header";
import Banner from "@/components/pagina/Banner_Video/banner_video";
import Ticker from "@/components/pagina/Ticker/ticker";
import About from "@/components/pagina/About/about";
import Opinion from "@/components/pagina/Opinion/opinion";
import Footer from "@/components/pagina/Footer/footer";
import ProductCard, { ProductCardProps } from '@/components/pagina/ProductCard/productcard';

export default async function Home() {
  // Caminho da imagem (Pasta public do Next.js)
  const imagePath = "/assets/imagens/tenis.jpg";

  const products: ProductCardProps[] = [
    { name: "Phone Holder Sakti", category: "Other", price: 29.90, rating: 5.0, reviews: "1.2k", image: imagePath },
    { name: "Headsound Wireless", category: "Music", price: 112.00, rating: 5.0, reviews: "3.2k", image: imagePath },
    { name: "Adudu Cleaner Robot", category: "Other", price: 259.90, rating: 4.8, reviews: "1k", image: imagePath },
    { name: "CCTV Maling 4K", category: "Home", price: 50.00, rating: 4.9, reviews: "720", image: imagePath },
    { name: "Stuffus Peker 32", category: "Other", price: 9.90, rating: 5.0, reviews: "1.2k", image: imagePath },
    { name: "Stuffus R175 Earbuds", category: "Music", price: 34.10, rating: 4.8, reviews: "2.4k", image: imagePath },
    { name: "Smart Watch V2", category: "Wearable", price: 199.00, rating: 4.7, reviews: "850", image: imagePath },
    { name: "Gaming Mouse Pro", category: "Other", price: 45.50, rating: 5.0, reviews: "5k", image: imagePath },
    { name: "Mechanical Keyboard", category: "Other", price: 89.00, rating: 4.9, reviews: "1.5k", image: imagePath },
  ];

  return (
    <>
      <TopBar />
      <Header />
      <Banner videoSrc="/assets/banner_video/eagle.mp4" />
      <Ticker />

      <main className="main-container">
        {/* Sidebar fixa à esquerda */}
        <aside className="sidebar-placeholder">
          <div style={{
            padding: '25px',
            border: '1px solid #eee',
            borderRadius: '20px',
            minHeight: '500px',
            backgroundColor: '#fff',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Filtros</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ height: '20px', background: '#f5f5f5', borderRadius: '4px', width: '80%' }}></div>
              <div style={{ height: '20px', background: '#f5f5f5', borderRadius: '4px', width: '60%' }}></div>
              <div style={{ height: '20px', background: '#f5f5f5', borderRadius: '4px', width: '90%' }}></div>
            </div>
            <p style={{ color: '#ccc', fontSize: '0.8rem', marginTop: '30px' }}>
              Componente de filtro será inserido aqui.
            </p>
          </div>
        </aside>

        {/* Conteúdo de produtos à direita */}
        <section className="products-content">
          <div className="products-header">
            <h2 className="products-title">Produtos em Destaque</h2>
            <p className="products-subtitle">Os melhores produtos com os melhores preços</p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </section>
      </main>

      <About />
      <Opinion />
      <Footer />
    </>
  );
}