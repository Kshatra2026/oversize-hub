// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: 'Naruto Oversized Tee',
    category: 'anime',
    price: 599,
    originalPrice: 699,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=Naruto+Tee',
    description: 'Premium anime-inspired oversized tee featuring Naruto design. 100% cotton, drop-shoulder cut.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy']
  },
  {
    id: 2,
    name: 'Dragon Ball Z Classic',
    category: 'anime',
    price: 549,
    originalPrice: 649,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=DBZ+Tee',
    description: 'Classic Dragon Ball Z oversized tee with iconic print. Premium quality fabric.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Orange', 'Yellow']
  },
  {
    id: 3,
    name: 'F1 Racing Red',
    category: 'racing',
    price: 699,
    originalPrice: 799,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=F1+Racing',
    description: 'Motorsport-inspired oversized tee. Perfect for racing enthusiasts.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black', 'White']
  },
  {
    id: 4,
    name: 'Street Vibes',
    category: 'streetwear',
    price: 499,
    originalPrice: 599,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=Street+Vibes',
    description: 'Modern streetwear oversized tee with bold typography.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'White']
  },
  {
    id: 5,
    name: 'Minimal Pure',
    category: 'minimal',
    price: 399,
    originalPrice: 499,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=Minimal',
    description: 'Clean minimal design oversized tee. Timeless elegance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Beige']
  },
  {
    id: 6,
    name: 'Demon Slayer Elite',
    category: 'anime',
    price: 649,
    originalPrice: 749,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=Demon+Slayer',
    description: 'Demon Slayer anime oversized tee with premium print quality.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red', 'Purple']
  },
  {
    id: 7,
    name: 'Circuit Pro',
    category: 'racing',
    price: 729,
    originalPrice: 829,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=Circuit+Pro',
    description: 'Advanced racing tee with circuit track design.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Blue']
  },
  {
    id: 8,
    name: 'Urban Crown',
    category: 'streetwear',
    price: 549,
    originalPrice: 649,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=Urban+Crown',
    description: 'Streetwear premium oversized tee with crown graphic.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gold']
  },
  {
    id: 9,
    name: 'One Piece Legend',
    category: 'anime',
    price: 699,
    originalPrice: 799,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=One+Piece',
    description: 'One Piece anime oversized tee for true fans.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Blue', 'Red']
  },
  {
    id: 10,
    name: 'Elegance Simple',
    category: 'minimal',
    price: 449,
    originalPrice: 549,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=Elegance',
    description: 'Sophisticated minimal oversized tee. Versatile and comfortable.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Charcoal']
  },
  {
    id: 11,
    name: 'Tokyo Race Night',
    category: 'racing',
    price: 679,
    originalPrice: 779,
    image: 'https://via.placeholder.com/300x340/2a2a2a/ff4d1c?text=Tokyo+Race',
    description: 'Night racing inspired oversized tee with neon accents.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Neon', 'Gray']
  },
  {
    id: 12,
    name: 'Vintage Vibe',
    category: 'streetwear',
    price: 579,
    originalPrice: 679,
    image: 'https://via.placeholder.com/300x340/2a2a2a/e8c547?text=Vintage+Vibe',
    description: 'Retro vintage oversized tee with classic streetwear appeal.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Olive']
  }
];

// ===== CART AND STATE =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;
let currentSlide = 0;
const discountPercent = 10;

// ===== SLIDER FUNCTIONALITY =====
function nextSlide() {
  const container = document.getElementById('slidesContainer');
  const slides = container.querySelectorAll('.slide');
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  const container = document.getElementById('slidesContainer');
  const slides = container.querySelectorAll('.slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const container = document.getElementById('slidesContainer');
  const slides = container.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlide) slide.classList.add('active');
  });

  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) dot.classList.add('active');
  });

  container.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update progress bar
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = ((currentSlide + 1) / slides.length) * 100 + '%';
}

// Auto-advance slider every 8 seconds
setInterval(nextSlide, 8000);

// ===== PRODUCT RENDERING =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <span class="product-badge">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
        <button class="product-quick-add" onclick="openProductModal(${product.id})">Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.toUpperCase()}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">
          ₹${product.price}
          <span class="old">₹${product.originalPrice}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(category) {
  renderProducts(category);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;

  // Set modal content
  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.description;
  document.getElementById('priceOriginal').textContent = `₹${product.originalPrice}`;
  document.getElementById('priceCurrent').textContent = `₹${product.price}`;
  document.getElementById('discountBadge').textContent = `-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`;

  // Render sizes
  const sizesContainer = document.getElementById('sizesContainer');
  sizesContainer.innerHTML = '';
  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'size-btn';
    btn.textContent = size;
    btn.onclick = () => selectSize(btn);
    sizesContainer.appendChild(btn);
  });

  // Render colors
  const colorsContainer = document.getElementById('colorsContainer');
  colorsContainer.innerHTML = '';
  const colorMap = {
    'Black': '#000000',
    'White': '#ffffff',
    'Navy': '#001a4d',
    'Orange': '#ff8c00',
    'Yellow': '#ffdd00',
    'Red': '#ff0000',
    'Gray': '#808080',
    'Beige': '#f5f5dc',
    'Purple': '#800080',
    'Blue': '#0000ff',
    'Gold': '#ffd700',
    'Charcoal': '#36454f',
    'Neon': '#39ff14',
    'Brown': '#8b4513',
    'Olive': '#808000'
  };

  product.colors.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'color-btn';
    btn.style.backgroundColor = colorMap[color] || '#000000';
    btn.title = color;
    btn.onclick = () => selectColor(btn);
    colorsContainer.appendChild(btn);
  });

  // Reset quantity
  document.getElementById('quantity').value = 1;

  // Show modal
  const modal = document.getElementById('productModal');
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('sizeChartModal').classList.remove('active');
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(btn) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function increaseQty() {
  const qty = document.getElementById('quantity');
  qty.value = parseInt(qty.value) + 1;
}

function decreaseQty() {
  const qty = document.getElementById('quantity');
  if (parseInt(qty.value) > 1) qty.value = parseInt(qty.value) - 1;
}

function toggleSizeChart() {
  const modal = document.getElementById('sizeChartModal');
  modal.classList.toggle('active');
}

// ===== ADD TO CART =====
function addToCart() {
  const selectedSize = document.querySelector('.size-btn.active');
  const selectedColor = document.querySelector('.color-btn.active');
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!selectedSize || !selectedColor) {
    alert('Please select size and color');
    return;
  }

  const cartItem = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    image: currentProduct.image,
    size: selectedSize.textContent,
    color: selectedColor.title,
    quantity: quantity
  };

  // Check if item already exists
  const existing = cart.find(
    item =>
      item.id === cartItem.id &&
      item.size === cartItem.size &&
      item.color === cartItem.color
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  closeModal();

  // Show success message
  alert('Added to cart! 🎉');
}

// ===== WHATSAPP ORDER =====
function openWhatsApp() {
  const selectedSize = document.querySelector('.size-btn.active');
  const selectedColor = document.querySelector('.color-btn.active');
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!selectedSize || !selectedColor) {
    alert('Please select size and color');
    return;
  }

  const message = `Hi! I'm interested in ordering:\n*${currentProduct.name}*\nSize: ${selectedSize.textContent}\nColor: ${selectedColor.title}\nQuantity: ${quantity}\nPrice: ₹${currentProduct.price * quantity}`;
  const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
}

// ===== CART UI =====
function toggleCart(event) {
  if (event) event.preventDefault();
  document.getElementById('cartSidebar').classList.toggle('active');
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');

  cartCount.textContent = `(${cart.length})`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    updateCartSummary();
    return;
  }

  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size} | ${item.color}</div>
        <div class="cart-item-meta">Qty: ${item.quantity}</div>
        <div class="cart-item-price">₹${item.price * item.quantity}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
    `;
    cartItems.appendChild(cartItem);
  });

  updateCartSummary();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(subtotal * (discountPercent / 100));
  const total = subtotal - discount;

  document.getElementById('subtotal').textContent = `₹${subtotal}`;
  document.getElementById('discount').textContent = `−₹${discount}`;
  document.getElementById('total').textContent = `₹${total}`;
}

// ===== CHECKOUT =====
function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  // Hide cart, show checkout
  document.getElementById('cartSidebar').classList.remove('active');
  document.getElementById('checkoutPage').style.display = 'block';

  // Update checkout order summary
  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const orderSummary = document.getElementById('orderSummary');
  orderSummary.innerHTML = '';

  cart.forEach(item => {
    const summaryItem = document.createElement('div');
    summaryItem.className = 'summary-item';
    summaryItem.innerHTML = `
      <div class="summary-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="summary-item-details">
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-meta">Size: ${item.size} | ${item.color}</div>
        <div class="summary-item-meta">Qty: ${item.quantity}</div>
      </div>
      <div class="summary-item-price">₹${item.price * item.quantity}</div>
    `;
    orderSummary.appendChild(summaryItem);
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(subtotal * (discountPercent / 100));
  const total = subtotal - discount;

  document.getElementById('checkoutSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('checkoutDiscount').textContent = `−₹${discount}`;
  document.getElementById('checkoutTotal').textContent = `₹${total}`;
}

function backToCart() {
  document.getElementById('checkoutPage').style.display = 'none';
  document.getElementById('cartSidebar').classList.add('active');
}

// ===== PAYMENT PROCESSING =====
function processPayment() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;
  const address = document.getElementById('address').value;
  const postalCode = document.getElementById('postalCode').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  // Validation
  if (!fullName || !email || !phone || !city || !address || !postalCode) {
    alert('Please fill all delivery details');
    return;
  }

  // Store order data
  const order = {
    id: 'ORD' + Date.now(),
    customer: { fullName, email, phone, city, address, postalCode },
    items: cart,
    paymentMethod: paymentMethod,
    orderTime: new Date().toLocaleString(),
    status: 'payment_processing'
  };

  localStorage.setItem('currentOrder', JSON.stringify(order));

  // Show payment modal
  const paymentModal = document.getElementById('paymentModal');
  document.getElementById('paymentMethod').textContent = paymentMethod.toUpperCase();
  paymentModal.classList.add('active');

  // Simulate payment processing
  setTimeout(() => {
    paymentModal.classList.remove('active');
    completePayment(order);
  }, 3000);
}

function completePayment(order) {
  // Show order tracking page
  document.getElementById('checkoutPage').style.display = 'none';
  document.getElementById('orderTrackingPage').style.display = 'block';

  // Update tracking page
  document.getElementById('orderId').textContent = order.id;
  document.getElementById('paymentTime').textContent = order.orderTime;
  document.getElementById('deliveryAddress').textContent = `
    ${order.customer.fullName}<br>
    ${order.customer.address}<br>
    ${order.customer.city} - ${order.customer.postalCode}<br>
    Phone: ${order.customer.phone}
  `;

  // Render tracking items
  const trackingItems = document.getElementById('trackingItems');
  trackingItems.innerHTML = '';
  order.items.forEach(item => {
    const trackItem = document.createElement('div');
    trackItem.className = 'tracking-item';
    trackItem.innerHTML = `
      <div class="tracking-item-info">
        <div class="tracking-item-name">${item.name}</div>
        <div class="tracking-item-meta">Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}</div>
      </div>
      <div class="tracking-item-price">₹${item.price * item.quantity}</div>
    `;
    trackingItems.appendChild(trackItem);
  });

  // Auto-update timeline
  updateTimelineSteps();

  // Clear cart
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').textContent = '(0)';
}

function updateTimelineSteps() {
  let currentStep = 0;
  const steps = ['shippingStep', 'dispatchStep', 'deliveryStep', 'confirmStep'];

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const step = document.getElementById(steps[currentStep]);
      if (currentStep < 3) {
        step.classList.add('completed');
      } else {
        step.classList.add('active');
        document.getElementById('otpSection').style.display = 'flex';
      }
      currentStep++;
    } else {
      clearInterval(interval);
    }
  }, 3000);
}

function confirmDelivery() {
  const otpInput = document.getElementById('otpInput');
  alert('Delivery confirmed! Thank you for your order. 🎉');
  backToHome();
}

function backToHome() {
  document.getElementById('orderTrackingPage').style.display = 'none';
  document.getElementById('checkoutPage').style.display = 'none';
  location.href = '#categories';
  updateCartUI();
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  updateCartUI();
});
