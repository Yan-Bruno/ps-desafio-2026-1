'use client';

import { useState, useEffect } from 'react';
import { getAllCategories, Category } from '@/services/category-services';
import './filter.css';
import { SportProduct } from '@/components/pagina/ProductCard/productcard';

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
    selectedPriceRange: string;
}

const priceRanges = [
    { label: 'Todos os preços', min: 0, max: Infinity, value: 'all' },
    { label: 'Até R$ 50', min: 0, max: 50, value: '0-50' },
    { label: 'R$ 50 - R$ 100', min: 50, max: 100, value: '50-100' },
    { label: 'R$ 100 - R$ 200', min: 100, max: 200, value: '100-200' },
    { label: 'R$ 200 - R$ 500', min: 200, max: 500, value: '200-500' },
    { label: 'Acima de R$ 500', min: 500, max: Infinity, value: '500+' },
];

export default function Filters({ products, onFilterChange }: FiltersProps) {
    const [allCategories, setAllCategories] = useState<string[]>(['Todas']);
    const [allBrands, setAllBrands] = useState<string[]>(['Todas']);
    const [allYears, setAllYears] = useState<string[]>(['Todos']);

    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        selectedCategory: 'Todas',
        minPrice: 0,
        maxPrice: Infinity,
        selectedBrand: 'Todas',
        selectedYear: 'Todos',
        selectedPriceRange: 'all'
    });

    const [filteredCount, setFilteredCount] = useState(products.length);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

    // Buscar categorias da API
    useEffect(() => {
        async function loadCategories() {
            const categories: Category[] = await getAllCategories();
            setAllCategories(['Todas', ...categories.map((cat: Category) => cat.name)]);
        }
        loadCategories();
    }, []);

    // Extrair marcas e anos dos produtos
    useEffect(() => {
        if (products.length > 0) {
            const brands = ['Todas', ...new Set(products.map(p => p.marca))];
            const years = ['Todos', ...new Set(products.map(p => p.anoLancamento.toString()))].sort((a, b) =>
                b === 'Todos' ? -1 : a === 'Todos' ? 1 : parseInt(b) - parseInt(a)
            );
            setAllBrands(brands);
            setAllYears(years);
        }
    }, [products]);

    // Calcular faixa de preço
    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(p => p.price);
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setPriceRange({ min, max });
        }
    }, [products]);

    // Filtrar produtos
    useEffect(() => {
        if (products.length === 0) return;

        let filtered = [...products];

        if (filters.searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        if (filters.selectedCategory !== 'Todas') {
            filtered = filtered.filter(product => product.categoria === filters.selectedCategory);
        }

        if (filters.selectedBrand !== 'Todas') {
            filtered = filtered.filter(product => product.marca === filters.selectedBrand);
        }

        if (filters.selectedYear !== 'Todos') {
            filtered = filtered.filter(product => product.anoLancamento.toString() === filters.selectedYear);
        }

        filtered = filtered.filter(product =>
            product.price >= filters.minPrice && product.price <= filters.maxPrice
        );

        setFilteredCount(filtered.length);

        if (onFilterChange) {
            onFilterChange(filtered);
        }
    }, [filters, products]);

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

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const range = priceRanges.find(r => r.value === selectedValue);

        if (range) {
            setFilters(prev => ({
                ...prev,
                selectedPriceRange: selectedValue,
                minPrice: range.min,
                maxPrice: range.max === Infinity ? priceRange.max : range.max
            }));
        }
    };

    const handleClearFilters = () => {
        setFilters({
            searchTerm: '',
            selectedCategory: 'Todas',
            minPrice: 0,
            maxPrice: Infinity,
            selectedBrand: 'Todas',
            selectedYear: 'Todos',
            selectedPriceRange: 'all'
        });
    };

    const hasActiveFilters = () => {
        return filters.searchTerm !== '' ||
            filters.selectedCategory !== 'Todas' ||
            filters.selectedBrand !== 'Todas' ||
            filters.selectedYear !== 'Todos' ||
            filters.selectedPriceRange !== 'all';
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

            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-tag"></i> Categoria
                </label>
                <select
                    value={filters.selectedCategory}
                    onChange={handleCategoryChange}
                    className="filter-select"
                >
                    {allCategories.map((cat: string) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-building"></i> Marca
                </label>
                <select
                    value={filters.selectedBrand}
                    onChange={handleBrandChange}
                    className="filter-select"
                >
                    {allBrands.map((brand: string) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-calendar-alt"></i> Ano de Lançamento
                </label>
                <select
                    value={filters.selectedYear}
                    onChange={handleYearChange}
                    className="filter-select"
                >
                    {allYears.map((year: string) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    <i className="fas fa-dollar-sign"></i> Faixa de Preço
                </label>
                <select
                    value={filters.selectedPriceRange}
                    onChange={handlePriceRangeChange}
                    className="filter-select price-range-select"
                >
                    {priceRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                            {range.label}
                        </option>
                    ))}
                </select>

                {priceRange.min > 0 && priceRange.max > 0 && (
                    <div className="price-info">
                        <i className="fas fa-chart-line"></i>
                        <span>Produtos de R$ {priceRange.min} até R$ {priceRange.max}</span>
                    </div>
                )}
            </div>

            <div className="filter-result">
                <i className="fas fa-box-open"></i>
                <span>{filteredCount} artigo(s) encontrado(s)</span>
            </div>

            <div className="filter-stats">
                <div className="stat-item">
                    <i className="fas fa-store"></i>
                    <span>{products.length} total</span>
                </div>
                <div className="stat-item">
                    <i className="fas fa-tags"></i>
                    <span>{allCategories.length - 1} categorias</span>
                </div>
            </div>
        </div>
    );
}