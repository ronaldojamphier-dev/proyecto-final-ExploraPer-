document.addEventListener('DOMContentLoaded', () => {
    
    const btnTheme = document.getElementById('btn-theme');
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                document.body.style.backgroundColor = '#1a202c';
                document.body.style.color = '#ffffff';
                btnTheme.textContent = 'Modo Claro';
            } else {
                document.body.style.backgroundColor = '#fafafa';
                document.body.style.color = '#000000';
                btnTheme.textContent = 'Modo Oscuro';
            }
        });
    }

    const searchBar = document.getElementById('search-bar');
    const cards = document.querySelectorAll('.carts');
    if (searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            cards.forEach(card => {
                const name = card.getAttribute('data-name') ? card.getAttribute('data-name').toLowerCase() : '';
                if (name.includes(searchString)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const cartIcon = document.querySelector('.cart');
    const cartMenu = document.querySelector('.cart-products');
    const closeCartBtn = document.querySelector('.close-btn');

    if (cartIcon && cartMenu) {
        cartIcon.addEventListener('click', () => {
            if (cartMenu.style.display === 'block') {
                cartMenu.style.display = 'none';
            } else {
                cartMenu.style.display = 'block';
            }
        });
    }

    if (closeCartBtn && cartMenu) {
        closeCartBtn.addEventListener('click', () => {
            cartMenu.style.display = 'none';
        });
    }

    let counter = 0;
    const cartCounter = document.getElementById('cart-counter');
    const bookButtons = document.querySelectorAll('.btn-book');
    const cartProductsContainer = document.querySelector('.cart-products');
    
    const initialItems = document.querySelectorAll('.cart-products .item');
    initialItems.forEach(item => item.remove());

    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            counter++;
            if (cartCounter) cartCounter.textContent = counter;

            const card = button.closest('.carts');
            if (card) {
                const title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Destino';
                const imgElement = card.querySelector('img');
                const imgUrl = imgElement ? imgElement.src : '';
                
                let price = 'S/. 650';
                const priceElement = card.innerHTML.match(/S\/\.\s*\d+/);
                if (priceElement) {
                    price = priceElement[0];
                }

                const newItem = document.createElement('div');
                newItem.className = 'item';
                newItem.style.display = 'flex';
                newItem.style.alignItems = 'center';
                newItem.style.justifyContent = 'space-between';
                newItem.style.margin = '10px 0';
                newItem.innerHTML = `
                    <img src="${imgUrl}" alt="${title}" style="width: 50px; height: auto; margin-right: 10px;">
                    <div class="item-content" style="flex-grow: 1;">
                        <h5 style="margin: 0; color: #000;">${title}</h5>
                        <h5 class="cart-price" style="margin: 5px 0 0 0; color: #555;">${price}</h5>
                    </div>
                    <span class="delete-item-btn" style="cursor: pointer; color: red; font-weight: bold; font-size: 18px; padding: 0 5px;">X</span>
                `;

                const removeBtn = newItem.querySelector('.delete-item-btn');
                removeBtn.addEventListener('click', () => {
                    newItem.remove();
                    counter--;
                    if (counter < 0) counter = 0;
                    if (cartCounter) cartCounter.textContent = counter;
                });

                if (closeCartBtn) {
                    cartProductsContainer.insertBefore(newItem, closeCartBtn);
                } else {
                    cartProductsContainer.appendChild(newItem);
                }
            }
        });
    });
});