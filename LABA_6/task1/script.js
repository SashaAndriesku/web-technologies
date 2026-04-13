let state = { products: [], filter: 'all', sort: 'none' };

const add = (arr, item) => [...arr, { ...item, id: Date.now().toString(), created: Date.now(), updated: Date.now() }];
const update = (arr, id, item) => arr.map(i => i.id === id ? { ...i, ...item, updated: Date.now() } : i);
const remove = (arr, id) => arr.filter(i => i.id !== id);
const calcTotal = (arr) => arr.reduce((sum, p) => sum + Number(p.price), 0);
const filterItems = (arr, cat) => cat === 'all' ? arr : arr.filter(p => p.category === cat);
const sortItems = (arr, type) => {
    const copy = [...arr];
    if (type === 'price') return copy.sort((a, b) => a.price - b.price);
    if (type === 'created') return copy.sort((a, b) => a.created - b.created);
    if (type === 'updated') return copy.sort((a, b) => b.updated - a.updated);
    return copy;
};

const render = () => {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    const items = sortItems(filterItems(state.products, state.filter), state.sort);
    
    if (items.length === 0) {
        list.innerHTML = '<p>Наразі список товарів пустий. Додайте новий товар.</p>';
    } else {
        items.forEach(p => {
            const div = document.createElement('div');
            div.className = 'card';
            div.id = `c-${p.id}`;
            div.innerHTML = `
                <small>ID: ${p.id}</small>
                <h3>${p.name}</h3>
                <img src="${p.image}" alt="${p.name}">
                <p>${p.price} грн</p>
                <p>${p.category}</p>
                <button class="edit" data-id="${p.id}">Редагувати</button>
                <button class="del" data-id="${p.id}">Видалити</button>
            `;
            list.appendChild(div);
        });
    }
    document.getElementById('total-price').textContent = calcTotal(state.products);
};

const showToast = (msg) => {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3000);
};

document.getElementById('product-list').addEventListener('click', e => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('del')) {
        document.getElementById(`c-${id}`).classList.add('removing');
        setTimeout(() => {
            state.products = remove(state.products, id);
            render();
            showToast('Товар видалено');
        }, 300);
    }
    if (e.target.classList.contains('edit')) {
        const p = state.products.find(x => x.id === id);
        document.getElementById('p-id').value = p.id;
        document.getElementById('p-name').value = p.name;
        document.getElementById('p-price').value = p.price;
        document.getElementById('p-cat').value = p.category;
        document.getElementById('p-img').value = p.image;
        document.getElementById('modal').classList.remove('hidden');
    }
});

document.getElementById('btn-add').addEventListener('click', () => {
    document.getElementById('form').reset();
    document.getElementById('p-id').value = '';
    document.getElementById('modal').classList.remove('hidden');
});
document.getElementById('btn-close').addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('p-id').value;
    const data = {
        name: document.getElementById('p-name').value,
        price: document.getElementById('p-price').value,
        category: document.getElementById('p-cat').value,
        image: document.getElementById('p-img').value
    };
    if (id) {
        state.products = update(state.products, id, data);
        showToast(`Оновлено: ${id} - ${data.name}`);
    } else {
        state.products = add(state.products, data);
    }
    document.getElementById('modal').classList.add('hidden');
    render();
});

document.getElementById('filters').addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') { state.filter = e.target.dataset.cat; render(); }
});
document.getElementById('sorts').addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') { state.sort = e.target.dataset.sort; render(); }
});

render();