// =====================
// NAVBAR SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =====================
// HAMBURGER MENU
// =====================
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// =====================
// ROOM FILTER (Rooms page)
// =====================
function filterRooms(type, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter cards
  document.querySelectorAll('.room-list-card').forEach(card => {
    if (type === 'all' || card.dataset.type === type) {
      card.style.display = 'grid';
      card.style.animation = 'fadeUp 0.3s ease both';
    } else {
      card.style.display = 'none';
    }
  });
}

// =====================
// BOOKING CALCULATOR
// =====================
const roomNames = {
  '2800': 'Classic Single Room',
  '3500': 'Twin Room',
  '4500': 'Deluxe King Room',
  '6800': 'Family Deluxe Room',
  '8200': 'Garden Suite',
  '18000': 'Presidential Suite',
};

function calculateCost() {
  const checkinEl = document.getElementById('checkin');
  const checkoutEl = document.getElementById('checkout');
  const roomTypeEl = document.getElementById('roomType');

  if (!checkinEl || !checkoutEl || !roomTypeEl) return;

  const checkin = checkinEl.value;
  const checkout = checkoutEl.value;
  const roomPrice = roomTypeEl.value;

  // Update summary labels
  document.getElementById('sumCheckin').textContent = checkin ? formatDate(checkin) : '–';
  document.getElementById('sumCheckout').textContent = checkout ? formatDate(checkout) : '–';
  document.getElementById('sumRoom').textContent = roomPrice ? roomNames[roomPrice] : '–';

  if (checkin && checkout && roomPrice) {
    const nights = Math.max(0, Math.round((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)));
    const total = nights * parseInt(roomPrice);
    document.getElementById('sumNights').textContent = nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '–';
    document.getElementById('sumTotal').textContent = nights > 0 ? `₹${total.toLocaleString('en-IN')}` : '–';
  } else {
    document.getElementById('sumNights').textContent = '–';
    document.getElementById('sumTotal').textContent = '–';
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// =====================
// BOOKING FORM SUBMIT
// =====================
function submitBooking() {
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  if (!form || !success) return;

  // Basic validation
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], select');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e05c5c';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  if (!valid) {
    const errMsg = document.querySelector('.form-error');
    if (!errMsg) {
      const msg = document.createElement('p');
      msg.className = 'form-error';
      msg.style.cssText = 'color: #e05c5c; font-size: 0.85rem; margin-bottom: 12px;';
      msg.textContent = 'Please fill in all required fields.';
      form.querySelector('button').insertAdjacentElement('beforebegin', msg);
    }
    return;
  }

  form.style.display = 'none';
  success.classList.remove('hidden');
}

// =====================
// CONTACT FORM SUBMIT
// =====================
function submitContact() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!form || !success) return;

  form.style.display = 'none';
  success.classList.remove('hidden');
}

// =====================
// SCROLL REVEAL ANIMATION
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .room-card, .room-list-card, .testi-card, .team-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// =====================
// SET MIN DATE FOR DATE INPUTS
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
  });
});
