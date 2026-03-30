const catalog = new Map();
const orders = new Set();
const productHistory = new WeakMap();

function saveProduct() {
    const id = document.getElementById('p-id').value;
    const name = document.getElementById('p-name').value;
    const price = Number(document.getElementById('p-price').value);
    const stock = Number(document.getElementById('p-stock').value);
    const oldId = document.getElementById('old-id').value;

    if (!id || !name) return alert("Заповніть ID та назву");

    if (oldId) {
        
        const product = catalog.get(oldId);
        
        
        if (oldId !== id) {
            catalog.delete(oldId);
            catalog.set(id, product);
        }

        product.name = name;
        product.price = price;
        product.stock = stock;
        
        logChange(product, `Оновлено дані (ID: ${id})`);
    } else {
        
        const product = { name, price, stock };
        catalog.set(id, product);
        productHistory.set(product, [`Створено: ${new Date().toLocaleString()}`]);
    }

    resetForm();
    renderCatalog();
}

function logChange(product, message) {
    const logs = productHistory.get(product) || [];
    logs.push(`${message} [${new Date().toLocaleTimeString()}]`);
    productHistory.set(product, logs);
}

function editProduct(id) {
    const p = catalog.get(id);
    document.getElementById('p-id').value = id;
    document.getElementById('old-id').value = id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-stock').value = p.stock;

    document.getElementById('form-title').innerText = "Редагувати продукт";
    document.getElementById('cancel-btn').style.display = "block";
    document.getElementById('save-btn').innerText = "Оновити";
}

function resetForm() {
    document.getElementById('p-id').value = "";
    document.getElementById('old-id').value = "";
    document.getElementById('p-name').value = "";
    document.getElementById('p-price').value = "";
    document.getElementById('p-stock').value = "";
    document.getElementById('form-title').innerText = "Додати новий продукт";
    document.getElementById('cancel-btn').style.display = "none";
    document.getElementById('save-btn').innerText = "Зберегти";
}

function deleteProduct(id) {
    catalog.delete(id);
    renderCatalog();
}

function createOrder(id) {
    const p = catalog.get(id);
    if (p && p.stock > 0) {
        p.stock--;
        orders.add(`ORD-${Date.now()}`);
        logChange(p, "Продаж: -1 шт");
        renderCatalog();
    }
}

function uiSearch() {
    renderCatalog(document.getElementById('search-input').value.toLowerCase());
}

function renderCatalog(filter = "") {
    const list = document.getElementById('catalog-list');
    list.innerHTML = "";

    catalog.forEach((p, id) => {
        if (!p.name.toLowerCase().includes(filter)) return;

        const history = productHistory.get(p) || [];
        list.innerHTML += `
            <div class="product-card">
                <b>${p.name}</b> (ID: ${id})<br>
                Ціна: ${p.price}грн | Залишок: ${p.stock}шт
                <div class="actions">
                    <button class="edit-btn" onclick="editProduct('${id}')">Редагувати</button>
                    <button class="order-btn" onclick="createOrder('${id}')">Замовити</button>
                    <button class="del-btn" onclick="deleteProduct('${id}')">Видалити</button>
                </div>
                <small>Історія: ${history.slice(-2).join(" | ")}</small>
            </div>`;
    });
}