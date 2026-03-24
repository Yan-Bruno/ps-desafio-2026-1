// app/(site)/page.tsx
import TopBar from "@/components/pagina/TopBar/topbar";
import Header from "@/components/pagina/Header/header";
import Banner from "@/components/pagina/Banner_Video/banner_video";
import Ticker from "@/components/pagina/Ticker/ticker";
import About from "@/components/pagina/About/about";
import Opinion from "@/components/pagina/Opinion/opinion";
import Footer from "@/components/pagina/Footer/footer";
import ProductCard, { ProductCardProps } from '@/components/pagina/ProductCard/productcard';
import Filters from "@/components/pagina/Filter/filter";

export interface SportProduct extends ProductCardProps {
  id: number;
  marca: string;
  anoLancamento: number;
  quantidadeEstoque: number;
  categoria: string;
  precoOriginal: number;
}

export default async function Home() {
  // Imagem placeholder (pasta public do Next.js)
  const imagePath = "/assets/imagens/tenis.jpg";

  // Dados dos artigos esportivos conforme especificação do desafio
  const products: SportProduct[] = [
    {
      id: 1,
      name: "Chuteira Predator Elite",
      category: "Chuteiras",
      categoria: "Chuteiras",
      marca: "Adidas",
      price: 549.90,
      precoOriginal: 699.90,
      rating: 4.9,
      reviews: "2.3k",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 8
    },
    {
      id: 2,
      name: "Bola de Futebol Pro Max",
      category: "Bolas",
      categoria: "Bolas",
      marca: "Nike",
      price: 299.99,
      precoOriginal: 399.90,
      rating: 4.8,
      reviews: "1.5k",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 15
    },
    {
      id: 3,
      name: "Capacete Integral Race",
      category: "Capacetes",
      categoria: "Capacetes",
      marca: "LS2",
      price: 899.00,
      precoOriginal: 1099.90,
      rating: 4.7,
      reviews: "892",
      image: imagePath,
      anoLancamento: 2023,
      quantidadeEstoque: 5
    },
    {
      id: 4,
      name: "Raquete Pro Staff",
      category: "Raquetes",
      categoria: "Raquetes",
      marca: "Wilson",
      price: 429.90,
      precoOriginal: 529.90,
      rating: 4.9,
      reviews: "1.1k",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 12
    },
    {
      id: 5,
      name: "Chuteira Mercurial Vapor",
      category: "Chuteiras",
      categoria: "Chuteiras",
      marca: "Nike",
      price: 679.00,
      precoOriginal: 799.90,
      rating: 5.0,
      reviews: "3.4k",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 4
    },
    {
      id: 6,
      name: "Bola de Basquete Indoor",
      category: "Bolas",
      categoria: "Bolas",
      marca: "Spalding",
      price: 189.90,
      precoOriginal: 249.90,
      rating: 4.6,
      reviews: "567",
      image: imagePath,
      anoLancamento: 2023,
      quantidadeEstoque: 20
    },
    {
      id: 7,
      name: "Capacete Off-Road",
      category: "Capacetes",
      categoria: "Capacetes",
      marca: "Fox",
      price: 1299.00,
      precoOriginal: 1499.90,
      rating: 4.8,
      reviews: "432",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 3
    },
    {
      id: 8,
      name: "Raquete Nanoflare",
      category: "Raquetes",
      categoria: "Raquetes",
      marca: "Yonex",
      price: 389.90,
      precoOriginal: 459.90,
      rating: 4.8,
      reviews: "789",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 7
    },
    {
      id: 9,
      name: "Bola de Vôlei Elite",
      category: "Bolas",
      categoria: "Bolas",
      marca: "Mikasa",
      price: 159.90,
      precoOriginal: 199.90,
      rating: 4.7,
      reviews: "432",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 18
    },
    {
      id: 10,
      name: "Chuteira Phantom GT",
      category: "Chuteiras",
      categoria: "Chuteiras",
      marca: "Nike",
      price: 599.90,
      precoOriginal: 749.90,
      rating: 4.9,
      reviews: "1.8k",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 6
    },
    {
      id: 11,
      name: "Capacete de Ciclismo Aero",
      category: "Capacetes",
      categoria: "Capacetes",
      marca: "Giro",
      price: 459.90,
      precoOriginal: 549.90,
      rating: 4.7,
      reviews: "321",
      image: imagePath,
      anoLancamento: 2023,
      quantidadeEstoque: 9
    },
    {
      id: 12,
      name: "Raquete de Beach Tennis",
      category: "Raquetes",
      categoria: "Raquetes",
      marca: "Drop Shot",
      price: 279.90,
      precoOriginal: 349.90,
      rating: 4.6,
      reviews: "654",
      image: imagePath,
      anoLancamento: 2024,
      quantidadeEstoque: 14
    }
  ];

  return (
    <>
      <TopBar />
      <Header />

      {/* Banner Section */}
      <section id="banner">
        <Banner videoSrc="/assets/banner_video/eagle.mp4" />
      </section>

      <Ticker />

      {/* Produtos Section */}
      <section id="produtos">
        <main className="main-container">
          {/* Sidebar com filtros */}
          <aside className="sidebar-placeholder">
            <Filters products={products} />
          </aside>

          {/* Conteúdo de produtos à direita */}
          <div className="products-content">
            <div className="products-header">
              <h2 className="products-title">Artigos Esportivos</h2>
              <p className="products-subtitle">Equipamentos de alta performance para sua melhor performance</p>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          </div>
        </main>
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Opinion Section */}
      <section id="opinion">
        <Opinion />
      </section>

      {/* Footer Section */}
      <section id="footer">
        <Footer />
      </section>
    </>
  );
}