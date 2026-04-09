'use client';

import { useState, useEffect } from 'react';
import TopBar from "@/components/pagina/TopBar/topbar";
import Header from "@/components/pagina/Header/header";
import Banner from "@/components/pagina/Banner_Video/banner_video";
import Ticker from "@/components/pagina/Ticker/ticker";
import About from "@/components/pagina/About/about";
import Opinion from "@/components/pagina/Opinion/opinion";
import Footer from "@/components/pagina/Footer/footer";
import ProductCard, { SportProduct } from '@/components/pagina/ProductCard/productcard';
import Filters from "@/components/pagina/Filter/filter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function Home() {
  const [products, setProducts] = useState<SportProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<SportProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/articles`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        const mappedProducts: SportProduct[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          marca: item.brand,
          price: parseFloat(item.price),
          anoLancamento: item.year,
          imagem: item.image || '/assets/imagens/tenis.jpg',
          categoria: item.category?.name || 'Sem categoria',
          quantidade_estoque: item.amount
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);

      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleBuy = async (productId: string): Promise<boolean> => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product || product.quantidade_estoque <= 0) {
        showNotification('❌ Produto esgotado!');
        return false;
      }

      const response = await fetch(`${API_URL}/articles/${productId}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar compra');
      }

      const result = await response.json();

      if (result.success) {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === productId
              ? { ...p, quantidade_estoque: result.amount }
              : p
          )
        );

        setFilteredProducts(prevFiltered =>
          prevFiltered.map(p =>
            p.id === productId
              ? { ...p, quantidade_estoque: result.amount }
              : p
          )
        );

        showNotification(` Compra realizada com sucesso!`);
        return true;
      }

      showNotification(' Erro ao processar compra!');
      return false;

    } catch (error) {
      console.error('Erro ao processar compra:', error);
      showNotification(' Erro ao conectar com o servidor!');
      return false;
    }
  };

  const handleFilterChange = (filtered: SportProduct[]) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <>
        <TopBar />
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '16px' }}>
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Carregando produtos do servidor...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar />
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '20px' }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#dc2626' }}></i>
          <h3>Erro ao carregar produtos</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ padding: '10px 20px', marginTop: '10px' }}>
            <i className="fas fa-sync-alt"></i> Tentar novamente
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Header />

      {notification.show && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#710808',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '12px',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          fontWeight: '600',
          fontSize: '0.9rem',
          animation: 'slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards'
        }}>
          <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }}></i>
          <span>{notification.message}</span>
        </div>
      )}

      <section id="banner">
        <Banner videoSrc="/assets/banner_video/eagle.mp4" />
      </section>

      <Ticker />

      <section id="produtos">
        <main className="main-container">
          <aside className="sidebar-placeholder">
            <Filters products={products} onFilterChange={handleFilterChange} />
          </aside>

          <div className="products-content">
            <div className="products-header">
              <h2 className="products-title">Artigos Esportivos</h2>
              <p className="products-subtitle">
                Mostrando {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} produtos
                {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
              </p>
            </div>
            <div className="product-grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} onBuy={handleBuy} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Anterior
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </main>
      </section>

      <section id="about"><About /></section>
      <section id="opinion"><Opinion /></section>
      <section id="footer"><Footer /></section>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </>
  );
}