// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[n].classList.add('active');
  dots[n].classList.add('active');
  
  const container = document.getElementById('slidesContainer');
  if (container) {
    container.style.transform = `translateX(-${n * 100}%)`;
  }
  updateProgressBar();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
  resetAutoSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
  resetAutoSlide();
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(n);
  resetAutoSlide();
}

function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = ((currentSlide + 1) / totalSlides) * 100 + '%';
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

if (slides.length > 0) {
  startAutoSlide();
  showSlide(0);
}

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: 'Anime Dreams',
    category: 'Anime',
    price: 699,
    original_price: 799,
    image: 'https://via.placeholder.com/340x340?text=Anime+Dreams',
    description: 'Premium oversized tee inspired by legendary anime. Ultra-soft 100% cotton with iconic character print.',
    colors: ['Black', 'White', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 2,
    name: 'Racing Vibes',
    category: 'Racing',
    price: 749,
    original_price: 849,
    image: 'https://via.placeholder.com/340x340?text=Racing+Vibes',
    description: 'Motorsport-inspired oversized tee. Born in the pits, worn on the streets.',
    colors: ['Black', 'Red', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'Street Legends',
    category: 'Streetwear',
    price: 649,
    original_price: 749,
    image: 'https://via.placeholder.com/340x340?text=Street+Legends',
    description: 'Bold oversized streetwear tee. Make a statement with our premium print design.',
    colors: ['Black', 'White', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 4,
    name: 'Minimal Art',
    category: 'Minimal',
    price: 599,
    original_price: 699,
    image: 'https://via.placeholder.com/340x340?text=Minimal+Art',
    description: 'Minimalist oversized tee with subtle design. Perfect for all occasions.',
    colors: ['Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 5,
    name: 'Tokyo Nights',
    category: 'Anime',
    price: 699,
    original_price: 799,
    image: 'https://via.placeholder.com/340x340?text=Tokyo+Nights',
    description: 'Inspired by Tokyo\'s vibrant culture. Limited edition oversized tee.',
    colors: ['Black', 'Pink', 'Cyan'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 6,
    name: 'Speed Kings',
    category: 'Racing',
    price: 759,
    original_price: 859,
    image: 'https://via.placeholder.com/340x340?text=Speed+Kings',
    description: 'High-speed inspired design. Perfect for adrenaline junkies.',
    colors: ['Black', 'Orange', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 7,
    name: 'Urban Style',
    category: 'Streetwear',
    price: 659,
    original_price: 759,
    image: 'https://via.placeholder.com/340x340?text=Urban+Style',
    description: 'Urban fashion meets comfort. Oversized fit for everyone.',
    colors: ['Black', 'Khaki', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 8,
    name: 'Pure Black',
    category: 'Minimal',
    price: 599,
    original_price: 699,
    image: 'https://via.placeholder.com/340x340?text=Pure+Black',
    description: 'Classic black oversized tee. Timeless style for everyone.',
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
];

// ===== CART MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isFirstOrder = !localStorage.getItem('hasOrdered');

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(productId, size, color, quantity) {
  if (!size) {
    alert('Please select a size');
    return;
  }
  
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => 
    item.id === productId && item.size === size && item.color === color
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      size,
      color,
      quantity,
      selectedPrice: product.price
    });
  }
  
  updateCart();
  openCart();
  showNotification('Product added to cart! 🛍️');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
    return;
  }
  
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.size} • ${item.color}</div>
        <div class="cart-item-meta">Qty: ${item.quantity}</div>
        <div class="cart-item-price">₹${item.selectedPrice * item.quantity}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
    </div>
  `).join('');
}

function getCartTotal() {
  let total = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  if (isFirstOrder) {
    total = total * 0.9;
  }
  return total;
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const discount = isFirstOrder ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');
  
  if (subtotalEl) subtotalEl.textContent = '₹' + subtotal;
  if (discountEl) discountEl.innerHTML = 
    isFirstOrder ? `<span style="color: var(--accent);">₹${Math.round(discount)} (10% First Order)</span>` : '₹0';
  if (totalEl) totalEl.textContent = '₹' + Math.round(total);
}

// ===== CART SIDEBAR =====
function openCart(event) {
  if (event) event.preventDefault();
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar) {
    sidebar.classList.add('active');
    renderCart();
    updateCartSummary();
  }
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar) sidebar.classList.remove('active');
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  let selectedSize = '';
  let selectedColor = product.colors[0];
  window.currentProduct = product;
  window.selectedSize = product.sizes[0];
  window.selectedColor = product.colors[0];
  
  const modal = document.getElementById('productModal');
  if (!modal) return;
  
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
  
  let colorsHTML = '';
  const colorMap = {
    'Black': '#000000',
    'White': '#ffffff',
    'Blue': '#0066ff',
    'Red': '#ff0000',
    'Gold': '#ffd700',
    'Gray': '#808080',
    'Pink': '#ff1493',
    'Cyan': '#00ffff',
    'Orange': '#ff8c00',
    'Khaki': '#f0e68c'
  };
  
  product.colors.forEach((color, idx) => {
    colorsHTML += `
      <button class="color-btn ${idx === 0 ? 'active' : ''}" 
              style="background: ${colorMap[color] || '#000000'}" 
              onclick="selectColor(this, '${color}')" 
              title="${color}">
      </button>
    `;
  });
  
  const modalContent = `
    <button class="modal-close" onclick="closeProductModal()">×</button>
    <div class="modal-body">
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        
        <div class="price-section">
          <div class="price-current">₹${product.price}</div>
          <div class="price-original">₹${product.original_price}</div>
          <div class="discount-badge">-${discount}%</div>
        </div>
        
        ${isFirstOrder ? '<div style="background: rgba(232,197,71,0.1); padding: 10px; border-radius: 4px; margin-bottom: 20px; color: var(--accent); font-size: 0.85rem;"><strong>🎉 First Order Offer:</strong> Get 10% extra discount on checkout!</div>' : ''}
        
        <div class="size-section">
          <div class="size-header">
            <h3>Select Size</h3>
            <button class="size-chart-btn" onclick="openSizeChart()">Size Chart</button>
          </div>
          <div class="sizes">
            ${product.sizes.map((size, idx) => `
              <button class="size-btn ${idx === 0 ? 'active' : ''}" 
                      onclick="selectSize(this, '${size}')">${size}</button>
            `).join('')}
          </div>
        </div>
        
        <div class="color-section">
          <h3>Select Color</h3>
          <div class="colors">
            ${colorsHTML}
          </div>
        </div>
        
        <div class="quantity-section">
          <h3>Quantity</h3>
          <div class="quantity-control">
            <button onclick="decreaseQty()">−</button>
            <input type="number" id="quantityInput" value="1" min="1" readonly>
            <button onclick="increaseQty()">+</button>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="btn-add-cart" onclick="handleAddToCart()">Add to Cart</button>
          <button class="btn-whatsapp" onclick="handleWhatsAppOrder()">📱 Order via WhatsApp</button>
        </div>
      </div>
    </div>
  `;
  
  const content = document.getElementById('productModalContent');
  if (content) {
    content.innerHTML = modalContent;
  }
  
  modal.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.selectedSize = size;
}

function selectColor(btn, color) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.selectedColor = color;
}

function increaseQty() {
  const input = document.getElementById('quantityInput');
  if (input) input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
  const input = document.getElementById('quantityInput');
  if (input && parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function handleAddToCart() {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  addToCart(window.currentProduct.id, window.selectedSize, window.selectedColor, quantity);
  closeProductModal();
}

function handleWhatsAppOrder() {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  const message = `Hi! I'm interested in ordering:\n\n${window.currentProduct.name}\nSize: ${window.selectedSize}\nColor: ${window.selectedColor}\nQuantity: ${quantity}\nPrice: ₹${window.currentProduct.price * quantity}`;
  window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
  closeProductModal();
}

// ===== SIZE CHART MODAL =====
function openSizeChart() {
  const modal = document.getElementById('sizeChartModal');
  if (modal) modal.classList.add('active');
}

function closeSizeChart() {
  const modal = document.getElementById('sizeChartModal');
  if (modal) modal.classList.remove('active');
}

// ===== PRODUCT DISPLAY =====
function renderProducts() {
  const productsGrid = document.querySelector('.products-grid');
  if (!productsGrid) return;
  
  productsGrid.innerHTML = products.map(product => {
    const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
    return `
      <div class="product-card" onclick="openProductModal(${product.id})">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <span class="product-badge">-${discount}%</span>
          <button class="product-quick-add">Quick View</button>
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">₹${product.price} <span class="old">₹${product.original_price}</span></div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== CHECKOUT =====
function startCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  closeCart();
  const checkoutPage = document.getElementById('checkoutPage');
  if (checkoutPage) {
    checkoutPage.style.display = 'block';
    renderCheckoutSummary();
  }
}

function renderCheckoutSummary() {
  const summaryContainer = document.getElementById('checkoutSummary');
  if (!summaryContainer) return;
  
  const summaryHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="summary-item-details">
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-meta">${item.size} • ${item.color}</div>
        <div class="summary-item-meta">Qty: ${item.quantity}</div>
      </div>
      <div class="summary-item-price">₹${item.selectedPrice * item.quantity}</div>
    </div>
  `).join('');
  
  const subtotal = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const discount = isFirstOrder ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  
  summaryContainer.innerHTML = `
    ${summaryHTML}
    <div class="summary-totals">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>₹${subtotal}</span>
      </div>
      ${isFirstOrder ? `<div class="summary-row" style="color: var(--accent);">
        <span>First Order Discount (10%):</span>
        <span>-₹${Math.round(discount)}</span>
      </div>` : ''}
      <div class="summary-row total">
        <span>Total:</span>
        <span>₹${Math.round(total)}</span>
      </div>
    </div>
  `;
}

function backToCart() {
  const checkoutPage = document.getElementById('checkoutPage');
  if (checkoutPage) checkoutPage.style.display = 'none';
}

function processPayment() {
  const name = document.getElementById('deliveryName').value;
  const email = document.getElementById('deliveryEmail').value;
  const phone = document.getElementById('deliveryPhone').value;
  const address = document.getElementById('deliveryAddress').value;
  const city = document.getElementById('deliveryCity').value;
  const postal = document.getElementById('deliveryPostal').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  
  if (!name || !email || !phone || !address || !city || !postal || !paymentMethod) {
    alert('Please fill all fields and select a payment method');
    return;
  }
  
  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) paymentModal.classList.add('active');
  
  setTimeout(() => {
    if (paymentModal) paymentModal.classList.remove('active');
    
    const orderId = 'OS' + Date.now();
    const order = {
      orderId,
      items: cart,
      delivery: { name, email, phone, address, city, postal },
      paymentMethod: paymentMethod.value,
      total: getCartTotal(),
      timestamp: new Date(),
      status: 'payment-confirmed'
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(order));
    localStorage.setItem('hasOrdered', 'true');
    isFirstOrder = false;
    
    const checkoutPage = document.getElementById('checkoutPage');
    if (checkoutPage) checkoutPage.style.display = 'none';
    
    showOrderTracking(orderId);
    cart = [];
    updateCart();
  }, 2000);
}

// ===== ORDER TRACKING =====
function showOrderTracking(orderId) {
  const trackingPage = document.getElementById('orderTrackingPage');
  const order = JSON.parse(localStorage.getItem('currentOrder'));
  
  if (!trackingPage || !order) return;
  
  const itemsHTML = order.items.map(item => `
    <div class="tracking-item">
      <div class="tracking-item-info">
        <div class="tracking-item-name">${item.name} (${item.size})</div>
        <div class="tracking-item-meta">Qty: ${item.quantity}</div>
      </div>
      <div class="tracking-item-price">₹${item.selectedPrice * item.quantity}</div>
    </div>
  `).join('');
  
  const trackingHTML = `
    <button class="back-btn" onclick="backToHome()">← Back Home</button>
    
    <div class="tracking-header">
      <h2>Order Confirmed! 🎉</h2>
      <p>Order ID: <strong>${orderId}</strong></p>
    </div>
    
    <div class="order-timeline">
      <div class="timeline-step completed">
        <div class="timeline-marker">✓</div>
        <div class="timeline-content">
          <h3>Payment Confirmed</h3>
          <p>Your payment has been received successfully.</p>
        </div>
      </div>
      
      <div class="timeline-step active" id="shippingStep">
        <div class="timeline-marker">📦</div>
        <div class="timeline-content">
          <h3>Preparing to Ship</h3>
          <p>Your order is being prepared for shipment.</p>
        </div>
      </div>
      
      <div class="timeline-step" id="dispatchStep">
        <div class="timeline-marker">🚚</div>
        <div class="timeline-content">
          <h3>Dispatched</h3>
          <p>Your package is on its way to you.</p>
        </div>
      </div>
      
      <div class="timeline-step" id="deliveryStep">
        <div class="timeline-marker">📍</div>
        <div class="timeline-content">
          <h3>Out for Delivery</h3>
          <p>Your order is out for delivery today.</p>
        </div>
      </div>
      
      <div class="timeline-step" id="deliveredStep">
        <div class="timeline-marker">✓</div>
        <div class="timeline-content">
          <h3>Delivered</h3>
          <p>Order has been delivered successfully!</p>
          <div class="otp-section" id="otpSection" style="display: none;">
            <input type="text" id="otpInput" placeholder="Enter OTP" maxlength="6">
            <button onclick="verifyOTP()">Verify</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="order-details">
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Delivery To:</strong><br>${order.delivery.name}<br>${order.delivery.address}<br>${order.delivery.city} - ${order.delivery.postal}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Total Amount:</strong> ₹${Math.round(order.total)}</p>
      
      <h3 style="margin-top: 30px;">Items Ordered</h3>
      ${itemsHTML}
    </div>
  `;
  
  const trackingContent = document.getElementById('orderTrackingContent');
  if (trackingContent) {
    trackingContent.innerHTML = trackingHTML;
  }
  
  trackingPage.style.display = 'block';
  simulateOrderProgress();
}

function simulateOrderProgress() {
  let step = 1;
  const steps = ['shippingStep', 'dispatchStep', 'deliveryStep', 'deliveredStep'];
  
  const interval = setInterval(() => {
    if (step >= steps.length) {
      clearInterval(interval);
      const otpSection = document.getElementById('otpSection');
      if (otpSection) otpSection.style.display = 'flex';
      return;
    }
    
    const currentStep = document.getElementById(steps[step]);
    const prevStep = document.getElementById(steps[step - 1]);
    
    if (currentStep) currentStep.classList.add('active');
    if (prevStep) {
      prevStep.classList.remove('active');
      prevStep.classList.add('completed');
    }
    
    step++;
  }, 3000);
}

function verifyOTP() {
  const otp = document.getElementById('otpInput').value;
  if (otp.length === 6) {
    alert('🎉 Order delivered successfully! Thank you for shopping with Oversize Hub!');
    backToHome();
  } else {
    alert('Please enter a valid 6-digit OTP');
  }
}

function backToHome() {
  const trackingPage = document.getElementById('orderTrackingPage');
  if (trackingPage) trackingPage.style.display = 'none';
  window.location.href = '#products';
  window.location.reload();
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--accent);
    color: var(--black);
    padding: 16px 24px;
    border-radius: 4px;
    z-index: 3000;
    font-weight: 700;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 2000);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  updateCartSummary();
  
  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  
  const cartSidebar = document.getElementById('cartSidebar');
  if (cartSidebar) {
    cartSidebar.addEventListener('click', (e) => {
      if (e.target.id === 'cartSidebar') closeCart();
    });
  }
  
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', startCheckout);
  
  const payBtn = document.getElementById('payBtn');
  if (payBtn) payBtn.addEventListener('click', processPayment);
  
  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target.id === 'productModal') closeProductModal();
    });
  }
  
  const sizeChartModal = document.getElementById('sizeChartModal');
  if (sizeChartModal) {
    sizeChartModal.addEventListener('click', (e) => {
      if (e.target.id === 'sizeChartModal') closeSizeChart();
    });
  }
});

// Add cart button to navbar if not present
window.addEventListener('load', () => {
  const nav = document.querySelector('nav');
  if (nav && !document.getElementById('openCartBtn')) {
    const cartBtn = document.createElement('button');
    cartBtn.id = 'openCartBtn';
    cartBtn.className = 'nav-cta';
    cartBtn.innerHTML = '🛒 Cart';
    cartBtn.addEventListener('click', openCart);
    const lastLink = nav.querySelector('.nav-links');
    if (lastLink && lastLink.nextElementSibling) {
      lastLink.nextElementSibling.insertAdjacentElement('beforebegin', cartBtn);
    } else if (lastLink) {
      nav.insertBefore(cartBtn, lastLink.nextElementSibling);
    }
  }
});
