let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
let filter = 'all';

const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const markPurchasedButton = document.getElementById('markPurchasedButton');
const clearListButton = document.getElementById('clearListButton');
const shoppingListElement = document.getElementById('shoppingList');
const filterButtons = document.querySelectorAll('.filter-button');

function addItem() {
    const item = itemInput.value.trim();
    if (item) {
        shoppingList.push({ name: item, purchased: false });
        itemInput.value = '';
        updateList();
    }
}

function markPurchased() {
    shoppingList = shoppingList.map(item => ({ ...item, purchased: !item.purchased }));
    updateList();
}

function clearList() {
    if (confirm('Are you sure you want to clear the entire list?')) {
        shoppingList = [];
        updateList();
    }
}

function editItem(index) {
    const newItem = prompt('Edit item:', shoppingList[index].name);
    if (newItem && newItem.trim()) {
        shoppingList[index].name = newItem.trim();
        updateList();
    }
}

function deleteItem(index) {
    shoppingList.splice(index, 1);
    updateList();
}

function updateList() {
    shoppingListElement.innerHTML = '';
    shoppingList.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'purchased') return item.purchased;
        return !item.purchased;
    }).forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = item.purchased ? 'purchased' : '';
        listItem.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="edit-button" onclick="editItem(${index})">Edit</button>
                <button class="delete-button" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        shoppingListElement.appendChild(listItem);
    });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markPurchased);
clearListButton.addEventListener('click', clearList);
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateList();
    });
});

window.onload = updateList;
