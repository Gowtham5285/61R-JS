const products = [
  { name:"Naruto Action Figure", price:1299, category:"figure", badge:"Bestseller", img:"https://images-cdn.ubuy.co.in/66e6f7078093f7517854122c-s-h-figuarts-naruto-naruto-uzumaki-sage.jpg" },
  { name:"One Piece Hoodie", price:1899, category:"hoodie", badge:"Hot", img:"https://images-cdn.ubuy.co.in/6352d4518b1c7a4d65430c43-one-piece-hoodie-luffy-zoro-chopper.jpg" },
  { name:"Demon Slayer Poster", price:499, category:"poster", badge:"Trending", img:"https://rukminim2.flixcart.com/image/480/640/xif0q/poster/f/v/m/medium-all-characters-demon-slayer-framed-poster-anime-framed-original-imah2y8em38eawgx.jpeg?q=90" },
  { name:"Gojo Keychain", price:299, category:"accessory", badge:"New", img:"https://images.meesho.com/images/products/411084027/aatmj_512.webp?width=512" }
];

let cart = [];
let favorites = [];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartBox = document.getElementById("cartBox");

function renderProducts() {
  grid.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  products
    .filter(p => p.name.toLowerCase().includes(search))
    .filter(p => category === "all" || p.category === category)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <span class="badge">${p.badge}</span>
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        <div class="actions">
          <button class="add-btn">Add to Cart</button>
          <button class="fav-btn">${favorites.includes(p.name) ? "❤️" : "♡"}</button>
        </div>
      `;

      card.querySelector(".add-btn").onclick = () => addToCart(p.name);
      card.querySelector(".fav-btn").onclick = e => toggleFavorite(p.name, e);

      grid.appendChild(card);
    });
}

function addToCart(name) {
  cart.push(name);
  cartCount.textContent = cart.length;

  const li = document.createElement("li");
  li.innerHTML = `${name} <span style="cursor:pointer">❌</span>`;
  li.querySelector("span").onclick = () => {
    cart = cart.filter(item => item !== name);
    li.remove();
    cartCount.textContent = cart.length;
  };
  cartItems.appendChild(li);
}

function toggleFavorite(name, btn){
  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
    btn.textContent = "♡";
  } else {
    favorites.push(name);
    btn.textContent = "❤️";
  }
}

document.getElementById("cartBtn").onclick = () => cartBox.style.display = "block";
document.getElementById("closeCart").onclick = () => cartBox.style.display = "none";

searchInput.onkeyup = renderProducts;
categoryFilter.onchange = renderProducts;

renderProducts();
