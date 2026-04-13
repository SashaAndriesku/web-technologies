let state = { todos: [], sort: 'created' };

const add = (arr, text) => [...arr, { id: Date.now().toString(), text, done: false, created: Date.now(), updated: Date.now() }];
const remove = (arr, id) => arr.filter(i => i.id !== id);
const toggle = (arr, id) => arr.map(i => i.id === id ? { ...i, done: !i.done, updated: Date.now() } : i);
const edit = (arr, id, text) => arr.map(i => i.id === id ? { ...i, text, updated: Date.now() } : i);
const sortItems = (arr, type) => {
    const copy = [...arr];
    if (type === 'created') return copy.sort((a, b) => a.created - b.created);
    if (type === 'updated') return copy.sort((a, b) => b.updated - a.updated);
    if (type === 'status') return copy.sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1);
    return copy;
};

const render = () => {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    sortItems(state.todos, state.sort).forEach(t => {
        const div = document.createElement('div');
        div.className = `todo ${t.done ? 'done' : ''}`;
        div.id = `t-${t.id}`;
        div.innerHTML = `
            <input type="checkbox" class="check" data-id="${t.id}" ${t.done ? 'checked' : ''}>
            <input type="text" class="text" id="input-${t.id}" value="${t.text}" readonly>
            <button class="edit" data-id="${t.id}">Редагувати</button>
            <button class="del" data-id="${t.id}">Видалити</button>
        `;
        list.appendChild(div);
    });
};

document.getElementById('todo-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('t-input');
    state.todos = add(state.todos, input.value);
    input.value = '';
    render();
});

document.getElementById('todo-list').addEventListener('click', e => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('del')) {
        document.getElementById(`t-${id}`).classList.add('removing');
        setTimeout(() => {
            state.todos = remove(state.todos, id);
            render();
        }, 300);
    }
    
    if (e.target.classList.contains('check')) {
        state.todos = toggle(state.todos, id);
        render();
    }
    
    if (e.target.classList.contains('edit')) {
        const input = document.getElementById(`input-${id}`);
        if (input.hasAttribute('readonly')) {
            input.removeAttribute('readonly');
            input.focus();
            e.target.textContent = 'Зберегти';
        } else {
            input.setAttribute('readonly', true);
            state.todos = edit(state.todos, id, input.value);
            render();
        }
    }
});

document.getElementById('sorts').addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') { 
        state.sort = e.target.dataset.sort; 
        render(); 
    }
});

render();