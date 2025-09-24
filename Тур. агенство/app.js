// Simple UI interactions for demo (index.html)
// NOTE: form sends demo alerts. Replace with API/Google Sheets integration as needed.

document.addEventListener('DOMContentLoaded', () => {
  // Поиск
  const searchBtn = document.getElementById('searchBtn');
  searchBtn?.addEventListener('click', () => {
    const q = document.getElementById('q-destination').value.trim();
    const type = document.getElementById('q-type').value;
    if(!q) return alert('Введите направление.');
    alert('Поиск туров: ' + q + (type?(' — '+type):''));
  });

  // Подробнее на карточках
  document.querySelectorAll('.card .btn[data-place]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const place=e.currentTarget.dataset.place;
      const toInput=document.getElementById('to');
      if(toInput) toInput.value=place;
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // Модальное окно
  const modal=document.getElementById('modal');
  const modalClose=document.querySelector('.modal-close');

  document.getElementById('submitBtn')?.addEventListener('click', ()=>{
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    if(!name||!email) return alert('Заполните имя и email.');

    const payload={name,email,to:document.getElementById('to').value,date:document.getElementById('date').value,note:document.getElementById('note').value,ts:new Date().toISOString()};
    console.log('Booking payload (demo):',payload);

    modal.style.display='flex';
    setTimeout(()=>{modal.style.display='none';},3000);
    modalClose.onclick=()=>{modal.style.display='none';};

    document.getElementById('bookingForm').reset();
  });

  // Мобильное меню
  const mobileBtn=document.querySelector('.mobile-menu');
  const navOverlay=document.getElementById('navOverlay');
  mobileBtn?.addEventListener('click', ()=>navOverlay.classList.toggle('show'));
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', e=>{
      const target=document.querySelector(link.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); navOverlay.classList.remove('show'); }
    });
  });

  // Animate on scroll
  const scrollElements=document.querySelectorAll('.animate-on-scroll');
  const scrollObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
  },{threshold:0.1});
  scrollElements.forEach(el=>scrollObserver.observe(el));

  // Count-up
  const counters=document.querySelectorAll('.count-up');
  const counterObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting&&!entry.target.classList.contains('counted')){
        const el=entry.target,target=+el.dataset.target;
        let count=0,step=Math.ceil(target/100);
        const interval=setInterval(()=>{
          count+=step;
          if(count>=target){count=target;clearInterval(interval);}
          el.textContent=count.toLocaleString('ru-RU')+' ₽';
        },20);
        el.classList.add('counted');
      }
    });
  },{threshold:0.5});
  counters.forEach(counter=>counterObserver.observe(counter));

  // Отзывы
  const reviewsRow=document.getElementById('reviewsRow');
  const reviewForm=document.getElementById('reviewForm');
  const reviewBtn=document.getElementById('reviewBtn');
  const reviews=JSON.parse(localStorage.getItem('reviews')||'[]');
  reviews.forEach(r=>{
    const div=document.createElement('div'); div.className='test';
    div.innerHTML=`<strong>${r.name}</strong><p class="small">${r.text}</p>`;
    reviewsRow.appendChild(div);
  });
  reviewBtn?.addEventListener('click', ()=>{
    const name=document.getElementById('reviewName').value.trim();
    const text=document.getElementById('reviewText').value.trim();
    if(!name||!text) return alert('Заполните имя и отзыв.');
    const review={name,text}; reviews.push(review); localStorage.setItem('reviews',JSON.stringify(reviews));
    const div=document.createElement('div'); div.className='test';
    div.innerHTML=`<strong>${name}</strong><p class="small">${text}</p>`;
    reviewsRow.appendChild(div); reviewForm.reset();
  });
});
document.getElementById('clearReviewsBtn').addEventListener('click', () => {
  if (confirm('Вы уверены, что хотите удалить все отзывы?')) {
    localStorage.removeItem('reviews');
    document.getElementById('reviewsRow').innerHTML = '';
    alert('Отзывы удалены');
  }
});

const TOKEN = "8279383835:AAGeymPPGvI_xorSKR4C_CUNQ3_r1CHtGkY";
const CHAT_ID = "1180510649";

document.getElementById('submitBtn').addEventListener('click', () => {
  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    to: document.getElementById('to').value.trim(),
    date: document.getElementById('date').value,
    note: document.getElementById('note').value.trim(),
  };

  const text = `📩 Новая заявка в Stayl Travely:
👤 Имя: ${payload.name}
📧 Email: ${payload.email}
✈️ Направление: ${payload.to}
📅 Дата: ${payload.date}
📝 Комментарий: ${payload.note}`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  })
  .then(r => r.json())
  .then(data => {
    alert("Заявка отправлена в Telegram!");
    document.getElementById("bookingForm").reset();
  })
  .catch(err => alert("Ошибка: " + err));
});
document.addEventListener('DOMContentLoaded', () => {
  // Поиск, карточки и бронирование — как раньше

  // Отзывы
  const reviewsRow = document.getElementById('reviewsRow');
  const reviewForm = document.getElementById('reviewForm');
  const reviewBtn = document.getElementById('reviewBtn');

  // Загрузка отзывов из localStorage
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.forEach(r=>{
    const div = document.createElement('div');
    div.className='test';
    div.innerHTML=`<strong>${r.name}</strong><p class="small">${r.text}</p>`;
    reviewsRow.appendChild(div);
  });

  reviewBtn?.addEventListener('click', ()=>{
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if(!name || !text) return alert('Заполните имя и отзыв.');
    const review = {name,text};
    reviews.push(review);
    localStorage.setItem('reviews',JSON.stringify(reviews));
    const div = document.createElement('div');
    div.className='test';
    div.innerHTML=`<strong>${name}</strong><p class="small">${text}</p>`;
    reviewsRow.appendChild(div);
    reviewForm.reset();
  });
});
const mobileBtn = document.querySelector('.mobile-menu');
const topnav = document.querySelector('.topnav');
mobileBtn && mobileBtn.addEventListener('click', () => {
  topnav.classList.toggle('open');
});
const payload = {
  name,
  email,
  to: document.getElementById('to').value.trim(),
  date: document.getElementById('date').value,
  people: document.getElementById('people').value,
  extras: Array.from(document.getElementById('extras').selectedOptions).map(o => o.value),
  note: document.getElementById('note').value.trim(),
  ts: new Date().toISOString()
};
const extras = document.querySelectorAll('.extra');
extras.forEach(extra => {
  extra.addEventListener('click', () => {
    extra.classList.toggle('selected'); // переключение выбора
  });
});

// Сбор выбранных услуг при отправке формы
document.getElementById('submitBtn').addEventListener('click', () => {
  const selectedExtras = Array.from(document.querySelectorAll('.extra.selected')).map(e => e.dataset.value);

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    to: document.getElementById('to').value.trim(),
    date: document.getElementById('date').value,
    people: document.getElementById('people').value,
    extras: selectedExtras,
    note: document.getElementById('note').value.trim(),
    ts: new Date().toISOString()
  };

  // Модальное окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<div class="modal-content">
    <h3>Заявка принята!</h3>
    <p>Спасибо, ${payload.name}. Мы свяжемся с вами в ближайшее время.</p>
    <button class="modal-close">Закрыть</button>
  </div>`;
  document.body.appendChild(modal);
  document.querySelector('.modal-close').addEventListener('click', () => modal.remove());

  console.log('Booking payload:', payload);
  document.getElementById('bookingForm').reset();
  extras.forEach(e => e.classList.remove('selected')); // сброс выбора
});
btn.addEventListener('click', () => {
  const place = btn.dataset.place.toLowerCase();
  window.location.href = `all-destinations.html#${place}`;
});
