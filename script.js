document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    if (!history.state) {
        history.replaceState({ page: 'grid' }, document.title, location.href);
    }

    // --- DOM ELEMENTS ---
    const collectionGrid = document.getElementById('collection-grid');
    const productGrid = document.getElementById('product-grid');
    const productSlider = document.getElementById('product-slider');
    const orderSidebar = document.getElementById('orderSidebar');
    const searchInput = document.getElementById('product-search');
    const clearSearch = document.getElementById('clear-search');
    const searchSuggestions = document.getElementById('search-suggestions');
    const cartPopup = document.getElementById('cart-popup');
    const custNameInput = document.getElementById('cust-name');
    const custAddressInput = document.getElementById('cust-address');
    const whatsappBtn = document.getElementById('checkout-whatsapp');
    const pgroupslider = document.getElementById('pgroupslider');
    const dateElement = document.getElementById('current-date');
    const countElement = document.getElementById('online-count');
    const counters = document.querySelectorAll('.counter');
    const splash = document.getElementById('splash-screen');
    const currentTheme = localStorage.getItem('theme');
    const checkbox = document.getElementById('checkbox');
    const body = document.body;

    // --- DATA ---
    const collections = [
        { id: "beverages", name: "Beverages", previews: ["dwater.jpg", "dcokeb.jpg", "dcokec.jpg", "dpepsi.jpg"] },
        { id: "snacks", name: "Snacks", previews: ["ssalted.jpg", "skurkurem.jpg", "slaysg.jpg", "skurkurec.jpg"] },
        { id: "biscuits", name: "Biscuits", previews: ["bicrakjack.jpg", "biparleg.jpg", "bihideandseek.jpg", "bioreo.jpg"] },
        { id: "chocolates", name: "Chocolates", previews: ["chdc.jpg", "chcrispello.jpg", "chfruitnnut.jpg", "chkinderjoy.jpg"] },
        { id: "cleaningessentials", name: "Cleaning", previews: ["clarielb.jpg", "clharpic.jpg", "clodonill.jpg", "clfeathern.jpg"] },
        { id: "personal", name: "Personal Care", previews: ["pccomb.jpg", "pcalmond.jpg", "pcgillette.jpg", "pctowel.jpg"] }
    ];

    const products = [
/*Drink*/               { id: 1,   name: "Bottle-Pepsi",                                                             image: "dpepsi.jpg",            cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },

                        
    ];

    let recentAdditions = [];
    let activeCategory = "";
    let userCoords = null;
    const duration = 1000;

    // --- SPLASH SCREEN LOGIC ---
    if (window.innerWidth < 768) {
        if (splash) {
            body.classList.add('no-scroll');
            setTimeout(() => {
                splash.classList.add('fade-out');
                body.classList.remove('no-scroll');
                setTimeout(() => { splash.remove(); }, 1000);
            }, 3300);
        }
    } else {
        if (splash) splash.remove();
    }

    // --- NAVIGATION & HISTORY ---
    window.addEventListener('popstate', function (event) {
        const isSliderOpen = productSlider.classList.contains('active');
        const isCartOpen = orderSidebar.classList.contains('active');

        if (isSliderOpen || isCartOpen) {
            productSlider.classList.remove('active');
            orderSidebar.classList.remove('active');
        } else {
            if (sessionStorage.getItem('backPressedOnce')) {
                sessionStorage.removeItem('backPressedOnce');
                history.back();
            } else {
                sessionStorage.setItem('backPressedOnce', 'true');
                alert("Press the back button again to exit.");
                setTimeout(() => sessionStorage.removeItem('backPressedOnce'), 2000);
                history.pushState({ page: 'grid' }, document.title, location.href);
            }
        }
    });
    if (currentTheme === 'dark' && checkbox) {
    body.classList.add('dark-mode');
    checkbox.checked = true; // ✅ FIXED
}

    // --- UI RENDERING ---
    function renderCollections() {
        collectionGrid.innerHTML = collections.map(c => `
            <div class="collection-card" data-id="${c.id}" data-name="${c.name}">
                <div class="image-preview-box">
                    ${c.previews.map(img => `<div class="image-preview-card"><img src="${img}" alt="preview"></div>`).join('')}
                </div>
                <h3>${c.name}</h3>
            </div>
        `).join('');
    }

    function startCounters() {
    let startTime = null;
    const duration = 1500; // Ensure duration is defined

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const current = Math.floor(progress * target);
            counter.innerText = `${current}+`;
        });

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counters.forEach(counter => {
                counter.innerText = `${counter.getAttribute('data-target')}+`;
            });
        }
    }
    requestAnimationFrame(update);
}

// --- ADD THE INTERSECTION OBSERVER HERE ---
const observerOptions = {
    threshold: 0.1 // Trigger when 50% of the counter section is visible
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters(); // Start the animation
            observer.unobserve(entry.target); // Stop observing after it runs once
        }
    });
}, observerOptions);

// Select the container of your counters to observe
const statsSection = document.querySelector('.stats-container'); 
if (statsSection) {
    counterObserver.observe(statsSection);
}

    function openCollection(catId, catName) {
        activeCategory = catId;
        const sliderTitle = document.getElementById('slider-title');
        if (sliderTitle) sliderTitle.innerText = catName;
        
        // --- ADD THIS LINE BELOW ---
        productSlider.scrollTop = 0; 
        
        renderProducts(catId);
        orderSidebar.classList.remove('active');
        productSlider.classList.add('active');
        updateSidebar();
        history.pushState({ page: 'slider' }, document.title, location.href);
    }

    function renderProducts(catId) {
        const filtered = products.filter(p => p.cat === catId);
        if (filtered.length === 0) {
            productGrid.innerHTML = `<p class="empty-msg">Empty for now.</p>`;
            pgroupslider.innerHTML = "";
            return;
        }

        const subcatData = [];
        filtered.forEach(p => {
            if (!subcatData.find(s => s.name === p.subcat)) {
                subcatData.push({ name: p.subcat, image: p.image });
            }
        });

        subcatData.sort((a, b) => a.name.localeCompare(b.name));

        pgroupslider.innerHTML = subcatData.map(sub => `
            <div class="subcat-nav-item" data-target="sub-${sub.name.replace(/\s+/g, '')}">
                <img src="${sub.image}" alt="${sub.name}">
                <span>${sub.name}</span>
            </div>
        `).join('');

        const sortedProducts = [...filtered].sort((a, b) => a.subcat.localeCompare(b.subcat));
        const usedSubcats = new Set();

        productGrid.innerHTML = sortedProducts.map(p => {
            const currentVar = p.variants[p.selectedVariant];
            const cleanSubName = p.subcat.replace(/\s+/g, '');
            let anchorIdAttr = "";
            if (!usedSubcats.has(cleanSubName)) {
                anchorIdAttr = `id="sub-${cleanSubName}"`;
                usedSubcats.add(cleanSubName);
            }

            return `
                <div class="card" ${anchorIdAttr} data-subcat="${cleanSubName}" data-prod-id="${p.id}">
                    <div class="img-container">
                        <img src="${p.image}" class="iimg" alt="${p.name}">
                    </div>
                    <h4>${p.name}</h4>
                    <div class="variant-selector">
                        ${Object.keys(p.variants).map(v => `
                            <button class="variant-btn ${p.selectedVariant === v ? 'active' : ''}" 
                                data-product-id="${p.id}" data-variant="${v}">
                                <span>${v}</span>
                                <span class="unit-text">${p.variants[v].unit}</span>
                            </button>
                        `).join('')}
                    </div>
                    <p class="price-tag">Rs ${currentVar.price}</p>
                    <div class="controls">
                        <button class="add-btn ${currentVar.count > 0 ? 'hidden' : ''}" data-product-id="${p.id}">Add</button>
                        <div class="qty-controls ${currentVar.count > 0 ? '' : 'hidden'}">
                            <button class="qty-btn" data-product-id="${p.id}" data-change="-1">-</button>
                            <span>${currentVar.count}</span>
                            <button class="qty-btn" data-product-id="${p.id}" data-change="1">+</button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }

    // --- SCROLL & SYNC ---
    pgroupslider.addEventListener('click', (e) => {
        const item = e.target.closest('.subcat-nav-item');
        if (item) {
            item.classList.add('subcat-active-highlight');
            setTimeout(() => item.classList.remove('subcat-active-highlight'), 1000);

            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 85; 
                const elementPosition = targetElement.offsetTop;
                productSlider.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: "smooth"
                });
            }
        }
    });
    
 

    productSlider.addEventListener('scroll', () => {
        const productScrollTotal = productSlider.scrollHeight - productSlider.clientHeight;
        if (productScrollTotal > 0) {
            const scrollPct = productSlider.scrollTop / productScrollTotal;
            const sliderScrollTotal = pgroupslider.scrollHeight - pgroupslider.clientHeight;
            pgroupslider.scrollTop = scrollPct * sliderScrollTotal;
        }

        const sections = productGrid.querySelectorAll('.card[id^="sub-"]');
        let currentSectionId = "";
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= productSlider.getBoundingClientRect().top + 100) {
                currentSectionId = sec.id;
            }
        });

        document.querySelectorAll('.subcat-nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-target') === currentSectionId);
        });
    });

    // --- UTILITIES ---
    function updateDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        if (dateElement) dateElement.textContent = `📅 ${day}/${month}/${year}`;
    }

    function updateCount() {
        const randomPeople = Math.floor(Math.random() * 10) + 1;
        if (countElement) countElement.textContent = randomPeople;
    }

    function updateSidebar() {
        let itemsTotal = 0, totalItems = 0;
        let html = "";
        products.forEach(p => {
            Object.keys(p.variants).forEach(vName => {
                const v = p.variants[vName];
                if (v.count > 0) {
                    itemsTotal += (v.count * v.price);
                    totalItems += v.count;
                    html += `
                        <div class="order-item-detail">
                            <img src="${p.image}" alt="item">
                            <div>
                                <strong>${p.name} (${v.unit})</strong><br>
                                Rs ${v.price}
                                <div class="sidebar-controls">
                                    <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="-1">-</button>
                                    <span>${v.count}</span>
                                    <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="1">+</button>
                                </div>
                            </div>
                        </div>`;
                }
            });
        });

        let delivery = itemsTotal > 0 ? (itemsTotal < 300 ? 50 : (itemsTotal <= 1000 ? 100 : 200)) : 0;
        document.getElementById('sidebar-content').innerHTML = html || "<p>Cart is empty</p>";
        document.getElementById('subtotal-val').innerText = itemsTotal;
        document.getElementById('delivery-val').innerText = delivery;
        document.getElementById('total-price').innerText = itemsTotal + delivery;
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.innerText = totalItems;
        
        document.body.style.marginBottom = totalItems > 0 ? "7rem" : "0";

        if(totalItems > 0 && !orderSidebar.classList.contains('active')) {
            cartPopup.classList.remove('hidden');
            document.getElementById('popup-count').innerText = totalItems;
            document.getElementById('popup-images-container').innerHTML = [...new Set(recentAdditions)].slice(0, 5).map(img => `<img src="${img}" alt="recent">`).join('');
        } else { 
            cartPopup.classList.add('hidden'); 
        }
    }

    function openAndHighlight(productId, catId) {
        const col = collections.find(c => c.id === catId);
        openCollection(catId, col.name);
        setTimeout(() => {
            const el = document.querySelector(`[data-prod-id="${productId}"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight-search');
                setTimeout(() => el.classList.remove('highlight-search'), 1000);
            }
        }, 400);
    }

    // --- HANDLERS ---
    collectionGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.collection-card');
        if (card) openCollection(card.dataset.id, card.dataset.name);
    });

    productGrid.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.variant-btn')) {
        const btn = target.closest('.variant-btn');
        const p = products.find(prod => prod.id == btn.dataset.productId);
        p.selectedVariant = btn.dataset.variant;
        renderProducts(activeCategory);
    }

    if (target.classList.contains('add-btn') || target.classList.contains('qty-btn')) {
        const id = target.dataset.productId;
        const amount = parseInt(target.dataset.change || 1);
        const p = products.find(prod => prod.id == id);
        const v = p.variants[p.selectedVariant];
        
        v.count += amount;
        if (v.count < 0) v.count = 0;

        if (amount > 0) {
            // Add image to the start if increasing
            recentAdditions.unshift(p.image);
        } else if (amount < 0) {
            // Remove one instance of this image if decreasing
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) {
                recentAdditions.splice(index, 1);
            }
        }

        // Keep the preview list clean (max 4-5 items)
        if (recentAdditions.length > 5) recentAdditions.pop();

        renderProducts(activeCategory);
        updateSidebar();
    }
});

   orderSidebar.addEventListener('click', (e) => {
    if (e.target.classList.contains('side-qty-btn')) {
        const btn = e.target;
        const p = products.find(prod => prod.id == btn.dataset.id);
        const change = parseInt(btn.dataset.chg);
        
        p.variants[btn.dataset.var].count += change;
        if (p.variants[btn.dataset.var].count < 0) p.variants[btn.dataset.var].count = 0;

        // Sync the recentAdditions images
        if (change < 0) {
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) recentAdditions.splice(index, 1);
        } else {
            recentAdditions.unshift(p.image);
        }

        updateSidebar();
        if(activeCategory === p.cat) renderProducts(p.cat);
    }
});

    const toggleSidebar = () => {
        const opening = !orderSidebar.classList.contains('active');
        productSlider.classList.remove('active');
        orderSidebar.classList.toggle('active');
        if (opening) history.pushState({ page: 'cart' }, document.title, location.href);
        updateSidebar();
    };

    document.getElementById('cart-trigger').addEventListener('click', toggleSidebar);
    document.getElementById('cart-popup').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', () => history.back());
    document.getElementById('close-slider').addEventListener('click', () => history.back());

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        clearSearch.classList.toggle('hidden', !query);
        if (!query) { searchSuggestions.style.display = "none"; return; }
        const matches = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 6);
        if (matches.length > 0) {
            searchSuggestions.innerHTML = matches.map(p => `
                <div class="suggestion-item" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name}">
                    <img src="${p.image}" alt="suggest">
                    <span>${p.name}</span>
                </div>
            `).join('');
            searchSuggestions.style.display = "block";
        } else { searchSuggestions.style.display = "none"; }
    });
    // --- CLICK HANDLER FOR SEARCH SUGGESTIONS ---
    searchSuggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            const productId = item.dataset.id;
            const catId = item.dataset.cat;
            
            // 1. Execute your existing open and highlight logic
            openAndHighlight(productId, catId);
            
            // 2. Clear the search and hide suggestions
            searchInput.value = "";
            searchSuggestions.style.display = "none";
            clearSearch.classList.add('hidden');
        }
    });
    clearSearch.addEventListener('click', () => {
    // 1. Empty the input field
    searchInput.value = "";
    
    // 2. Hide the suggestions box
    searchSuggestions.style.display = "none";
    
    // 3. Hide the clear button itself
    clearSearch.classList.add('hidden');
    
    // 4. Return focus to the input (optional but better UX)
    searchInput.focus();
});

    document.getElementById('location-btn').addEventListener('click', async () => {
        const display = document.getElementById('location-display');
        if (navigator.geolocation) {
            display.innerText = "Locating...";
            navigator.geolocation.getCurrentPosition(async (pos) => {
                userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                    const data = await res.json();
                    custAddressInput.value = data.display_name || "Location Tagged";
                    display.innerText = `✅ Location Tagged`;
                } catch (e) { 
                    custAddressInput.value = `Lat: ${userCoords.lat}, Lon: ${userCoords.lon}`;
                    display.innerText = "✅ Coordinates Captured"; 
                }
            }, () => { display.innerText = "❌ Access Denied"; });
        }
    });

    whatsappBtn.addEventListener('click', () => {
        const name = custNameInput.value;
        const address = custAddressInput.value;
        const subtotal = document.getElementById('subtotal-val').innerText;
        const delivery = document.getElementById('delivery-val').innerText;
        const total = document.getElementById('total-price').innerText;
        
        if (total == "0") { alert("Cart is empty!"); return; }
        if (!name || !address) { alert("Please enter Name and Address."); return; }
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB'); 
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const locationLink = userCoords ? `https://www.google.com/maps?q=${userCoords.lat},${userCoords.lon}` : `(Location not tagged)`;
        const divider = "--------------------------%0A";
        
        let msg = `🛍️ *NEW ORDER - WINK IT*%0A`;
        msg += divider;
        msg += `📅 Date: ${dateStr} | ${timeStr}%0A`;
        msg += `👤 Name: ${name}%0A📍 Address: ${address}%0A🗺️ Location: ${locationLink}%0A%0A`;
        msg += `🛒 *ITEMS:*%0A`;
        
        let itemIndex = 1;
        products.forEach(p => {
            Object.keys(p.variants).forEach(vName => {
                const v = p.variants[vName];
                if (v.count > 0) {
                    msg += `${itemIndex}. ${p.name} (${v.unit}) x${v.count} - ₹${v.price * v.count}%0A`;
                    itemIndex++; 
                }
            });
        });

        msg += divider;
        msg += `Subtotal: ₹${subtotal}%0A`;
        msg += `Delivery: ₹${delivery}%0A`;
        msg += `*TOTAL AMOUNT: ₹${total}*%0A`; 
        msg += divider;
        msg += `Cash on Delivery, our delivery partner will call you shortly.`;
        
        window.location.href = `https://api.whatsapp.com/send?phone=917983427187&text=${msg}`;
    });

    checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
    });

    // --- STARTUP ---// --- STARTUP ---
    updateCount();
    updateDate();
    setInterval(updateCount, 60000);
    
    // Sort and Render
    products.sort((a, b) => a.name.localeCompare(b.name));
    renderCollections(); // This is the crucial call!

    // Corrected theme logic
    if (currentTheme === 'dark' && checkbox) {
    body.classList.add('dark-mode');
    checkbox.checked = true; // ✅ FIXED
}

});
