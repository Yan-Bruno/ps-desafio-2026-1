// components/pagina/Filters/filters.tsx
'use client';

import { useState, useEffect } from 'react';
import './filter.css';
import { SportProduct } from '@/app/(site)/page';

interface FiltersProps {
    products: SportProduct[];
    onFilterChange?: (filteredProducts: SportProduct[]) => void;
}

interface FilterState {
    searchTerm: string;
    selectedCategory: string;
    minPrice: number;
    maxPrice: number;
    selectedBrand: string;
    selectedYear: string;
}

export default function Filters({ products, onFilterChange }: FiltersProps) {
    // Extrair categorias únicas
    const categories = ['Todas', ...new Set(products.map(p => p.categoria))];

    // Extrair marcas únicas
    const brands = ['Todas', ...new Set(products.map(p => p.marca))];

    // Extrair anos únicos
    const years = ['Todos', ...new Set(products.map(p => p.anoLancamento.toString()))].sort((a, b) =>
        b === 'Todos' ? -1 : a === 'Todos' ? 1 : parseInt(b) - parseInt(a)
    );

    // Estado dos filtros
    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        selectedCategory: 'Todas',
        minPrice: 0,
        maxPrice: 2000,
        selectedBrand: 'Todas',
        selectedYear: 'Todos'
    });

    const [filteredCount, setFilteredCount] = useState(products.length);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

    // Calcular preços mínimo e máximo dos produtos
    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(p => p.price);
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setPriceRange({ min, max });
            setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
        }
    }, [products]);

    // Aplicar filtros em tempo real
    useEffect(() => {
        if (products.length === 0) return;

        let filtered = [...products];

        // Filtro por nome
        if (filters.searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        // Filtro por categoria
        if (filters.selectedCategory !== 'Todas') {
            filtered = filtered.filter(product => product.categoria === filters.selectedCategory);
        }

        // Filtro por marca
        if (filters.selectedBrand !== 'Todas') {
            filtered = filtered.filter(product => product.marca === filters.selectedBrand);
        }

        // Filtro por ano
        if (filters.selectedYear !== 'Todos') {
            filtered = filtered.filter(product => product.anoLancamento.toString() === filters.selectedYear);
        }

        // Filtro por preço
        filtered = filtered.filter(product =>
            product.price >= filters.minPrice && product.price <= filters.maxPrice
        );

        setFilteredCount(filtered.length);

        if (onFilterChange) {
            onFilterChange(filtered);
        }
    }, [filters, products, onFilterChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, selectedCategory: e.target.value }));
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, selectedBrand: e.target.value }));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, selectedYear: e.target.value }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = Number(value);

        if (name === 'minPrice') {
            if (numValue <= filters.maxPrice) {
                setFilters(prev => ({ ...prev, minPrice: numValue }));
            }
        } else if (name === 'maxPrice') {
            if (numValue >= filters.minPrice) {
                setFilters(prev => ({ ...prev, maxPrice: numValue }));
            }
        }
    };

    const handleClearFilters = () => {
        setFilters({
            searchTerm: '',
            selectedCategory: 'Todas',
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            selectedBrand: 'Todas',
            selectedYear: 'Todos'
        });
    };

    const hasActiveFilters = () => {
        return filters.searchTerm !== '' ||
            filters.selectedCategory !== 'Todas' ||
            filters.selectedBrand !== 'Todas' ||
            filters.selectedYear !== 'Todos' ||
            filters.minPrice !== priceRange.min ||
            filters.maxPrice !== priceRange.max;
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <h3 className="filters-title">
                    <i className="fas fa-sliders-h"></i> Filtros
                </h3>
                {hasActiveFilters() && (
                    <button onClick={handleClearFilters} className="clear-filters">
                        <i className="fas fa-undo-alt"></i> Limpar
                    </button>
                )}
            </div>

            {/* Busca por nome */}
            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-search"></i> Buscar produto
                </label>
                <input
                    type="text"
                    placeholder="Digite o nome do artigo..."
                    value={filters.searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Filtro por categoria */}
            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-tag"></i> Categoria
                </label>
                <select
                    value={filters.selectedCategory}
                    onChange={handleCategoryChange}
                    className="filter-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Filtro por marca */}
            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-building"></i> Marca
                </label>
                <select
                    value={filters.selectedBrand}
                    onChange={handleBrandChange}
                    className="filter-select"
                >
                    {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {/* Filtro por ano de lançamento */}
            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-calendar-alt"></i> Ano de Lançamento
                </label>
                <select
                    value={filters.selectedYear}
                    onChange={handleYearChange}
                    className="filter-select"
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Filtro por faixa de preço */}
            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-dollar-sign"></i> Faixa de Preço
                </label>
                <div className="price-range">
                    <div className="price-inputs">
                        <div className="price-input-wrapper">
                            <span>R$</span>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handlePriceChange}
                                min={priceRange.min}
                                max={filters.maxPrice}
                                className="price-input"
                            />
                        </div>
                        <span className="price-separator">até</span>
                        <div className="price-input-wrapper">
                            <span>R$</span>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handlePriceChange}
                                min={filters.minPrice}
                                max={priceRange.max}
                                className="price-input"
                            />
                        </div>
                    </div>
                    <div className="slider-container">
                        <input
                            type="range"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                            className="price-slider"
                        />
                        <input
                            type="range"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                            className="price-slider"
                        />
                    </div>
                </div>
            </div>

            {/* Resultado da filtragem */}
            <div className="filter-result">
                <i className="fas fa-box-open"></i>
                <span>{filteredCount} artigo(s) encontrado(s)</span>
            </div>

            {/* Estatísticas rápidas */}
            <div className="filter-stats">
                <div className="stat-item">
                    <i className="fas fa-store"></i>
                    <span>{products.length} total</span>
                </div>
                <div className="stat-item">
                    <i className="fas fa-tags"></i>
                    <span>{categories.length - 1} categorias</span>
                </div>
            </div>
        </div>
    );
}