const destinations = [
  {name:"Париж", desc:"3 дня / 2 ночи — круиз по Сене", price:"19900", img:"https://source.unsplash.com/collection/190727/800x600"},
  {name:"Мальдивы", desc:"7 дней в бунгало над водой", price:"89990", img:"https://source.unsplash.com/collection/190728/800x600"},
  {name:"Норвегия", desc:"8 дней — автопутешествие и круизы", price:"54500", img:"https://source.unsplash.com/collection/190726/800x600"},
  {name:"Япония", desc:"10 дней — Токио, Киото и фуд-тур", price:"129000", img:"https://source.unsplash.com/collection/190729/800x600"},
  {name:"Италия", desc:"Рим, Венеция и Флоренция", price:"45000", img:"https://source.unsplash.com/collection/190730/800x600"},
  {name:"Испания", desc:"Барселона и Мадрид", price:"42500", img:"https://source.unsplash.com/collection/190731/800x600"},
  {name:"Греция", desc:"Афины и Санторини", price:"38900", img:"https://source.unsplash.com/collection/190732/800x600"},
  {name:"Таиланд", desc:"Бангкок и Пхукет", price:"33000", img:"https://source.unsplash.com/collection/190733/800x600"},
  {name:"США", desc:"Нью-Йорк и Лос-Анджелес", price:"120000", img:"https://source.unsplash.com/collection/190734/800x600"},
  {name:"Канада", desc:"Ванкувер и Банф", price:"105000", img:"https://source.unsplash.com/collection/190735/800x600"},
  {name:"Австралия", desc:"Сидней и Мельбурн", price:"135000", img:"https://source.unsplash.com/collection/190736/800x600"},
  {name:"Исландия", desc:"Рейкьявик и фьорды", price:"150000", img:"https://source.unsplash.com/collection/190737/800x600"}
];

const mainGrid = document.getElementById('destinationsGrid');
const allGrid = document.getElementById('allDestinationsGrid') || mainGrid;

// На главной странице только 3
const mainDestinations = destinations.slice(0,3);

(mainGrid ? mainDestinations : destinations).forEach((dest,i)=>{
  const card=document.createElement('article');
  card.className='card animate-on-scroll delay-'+(i%3+1);
  card.innerHTML=`
    <img src="${dest.img}" alt="${dest.name}">
    <div class="body">
      <h3>${dest.name}</h3>
      <p class="small">${dest.desc}</p>
      <div class="card-foot">
        <div class="price count-up" data-target="${dest.price}">0 ₽</div>
        <button class="btn" data-place="${dest.name}">Подробнее</button>
      </div>
    </div>
  `;
  allGrid.appendChild(card);
});
