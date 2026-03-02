// SERVICES SECTION - JAVASCRIPT ONLY

// Services Data
const services = {
    manicure: [
        { name: 'Unhas Acrílicas', desc: 'Unhas de acrílico profissionais com qualquer design e cor.' },
        { name: 'Unhas com Extensão', desc: 'Extensão completa de unhas com alongamento e design profissional.' },
        { name: 'Unhas sem Extensão', desc: 'Fortalecimento e design em unhas naturais.' },
        { name: 'Manutenção em Acrílico', desc: 'Correção e renovação de manicure acrílica.' },
        { name: 'Unhas de Acrigel', desc: 'Sistema híbrido premium para uma manicure perfeita.' },
        { name: 'Manutenção Acrigel', desc: 'Correção e renovação de manicure Acrigel.' },
        { name: 'Armadura Acrílica', desc: 'Fortalecimento e proteção das unhas com sistema acrílico.' },
        { name: 'Esmalte em Gel', desc: 'Manicure com esmalte em gel para uma cobertura duradoura.' },
        { name: 'Spa de Mãos', desc: 'Tratamentos de spa para as mãos com nutrição e hidratação.' },
    ],
    pedicure: [
        { name: 'Pedicure Tradicional', desc: 'Pedicure clássico com esmaltação e cuidados profissionais.' },
        { name: 'Esmalte em Gel', desc: 'Pedicure com esmalte em gel de longa duração.' },
        { name: 'Pedicure Brasil', desc: 'Pedicure brasil com esfoliação e cuidados.' },
        { name: 'Spa de Pés', desc: 'Tratamento completo de spa para os pés com hidratação.' },
        { name: 'Manutenção', desc: 'Manutenção e renovação de pedicure anterior.' },
    ],
    lashes: [
        { name: 'Extensões de Pestanas', desc: 'Extensões de Pestanas profissionais com aplicação individual.' },
        { name: 'Pestanas Clássicas', desc: 'Extensões de pestanas clássicas (fio a fio).' },
        { name: 'Pestanas Coloridas', desc: 'Extensões de pestanas coloridas para um visual radiante.' },
        { name: 'Pestanas Volume', desc: 'Extensões com efeito volume para um olhar impactante.' },
        { name: 'Manutenção', desc: 'Manutenção e reforço de extensões existentes.' },
    ],
    brows: [
        { name: 'Modelagem', desc: 'Correção das sobrancelhas para aparência ideal.' },
        { name: 'Depilação com Linha', desc: 'Remoção de pelos utilizando técnica de linha.' },
        { name: 'Laminação', desc: 'Laminação de sobrancelhas para estilo duradouro.' },
        { name: 'Permanente', desc: 'Maquilhagem permanente das sobrancelhas.' },
    ],
    waxing: [
        { name: 'Depilação Brasileira', desc: 'Remoção profissional de pelos com cera.' },
        { name: 'Depilação com Cera', desc: 'Remoção de pelos no corpo e rosto com cera.' },
        { name: 'Corpo Inteiro', desc: 'Depilação completa do corpo com cera de qualidade.' },
        { name: 'Depilação com Laser', desc: 'Remoção de pelos com tecnologia laser avançada.' },
    ],
    makeup: [
        { name: 'Maquilhagem Permanente', desc: 'Maquilhagem permanente com resultados duradouros.' },
        { name: 'Sobrancelhas Permanente', desc: 'Maquilhagem permanente das sobrancelhas com resultado natural.' },
        { name: 'Lábios Permanente', desc: 'Coloração permanente dos lábios.' },
        { name: 'Maquilhagem Profissional', desc: 'Maquilhagem profissional para eventos especiais.' },
        { name: 'Maquilhagem Noiva', desc: 'Maquilhagem especial para o dia do casamento.' },
    ],
};

const categories = [
    { key: 'manicure', label: 'Manicure', icon: '✨' },
    { key: 'pedicure', label: 'Pedicure', icon: '💅' },
    { key: 'lashes', label: 'Pestanas', icon: '👁️' },
    { key: 'brows', label: 'Sobrancelhas', icon: '🎨' },
    { key: 'waxing', label: 'Depilação', icon: '🌸' },
    { key: 'makeup', label: 'Maquilhagem', icon: '💄' },
];

let selectedCategory = 'manicure';

// DOM Elements
const categoryTabs = document.getElementById('categoryTabs');
const servicesGrid = document.getElementById('servicesGrid');

// Initialize
function initServices() {
    renderCategoryTabs();
    renderServices('manicure');
}

// Render category tabs
function renderCategoryTabs() {
    categoryTabs.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.key === selectedCategory ? 'active' : ''}" 
                data-category="${cat.key}">
            ${cat.icon} ${cat.label}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectCategory(this.dataset.category);
        });
    });
}

// Render services
function renderServices(category) {
    const categoryServices = services[category] || [];
    servicesGrid.innerHTML = categoryServices.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
}

// Select category
function selectCategory(category) {
    selectedCategory = category;
    renderCategoryTabs();
    renderServices(category);
}

// Start on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServices);
} else {
    initServices();
}
