document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartBadge = document.querySelector("#cart-count");
  const cartDrawer = document.querySelector("#cart-drawer");
  const cartOverlay = document.querySelector("#cart-overlay");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const cartButton = document.querySelector(".cart-button");
  const closeCartButton = document.querySelector(".close-cart");

  function renderCart() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartBadge.textContent = totalCount;
    cartTotal.textContent = `${totalPrice} €`;
    document.querySelector(".checkout-button").disabled = cart.length === 0;
    cartItems.innerHTML = cart.length === 0
      ? '<p class="empty-cart">Votre panier est encore vide.<br>Les belles choses arrivent juste en dessous.</p>'
      : cart.map((item, index) => `<div class="cart-item"><img src="${item.image}" alt=""><div class="cart-item-details"><h3>${item.name}</h3><p>${item.quantity} × ${item.price} €</p></div><button class="remove-item" type="button" data-index="${index}" aria-label="Retirer ${item.name}">×</button></div>`).join("");
    cartItems.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => { cart.splice(Number(button.dataset.index), 1); renderCart(); });
    });
  }

  function setCartVisibility(isVisible) {
    cartDrawer.classList.toggle("is-open", isVisible);
    cartOverlay.classList.toggle("is-visible", isVisible);
    cartDrawer.setAttribute("aria-hidden", String(!isVisible));
    cartButton.setAttribute("aria-expanded", String(isVisible));
  }

  document.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const productName = card.querySelector("h3").textContent;
      const productPrice = Number(card.querySelector("strong").textContent.replace(" €", ""));
      const existingItem = cart.find((item) => item.name === productName);
      if (existingItem) existingItem.quantity += 1;
      else cart.push({ name: productName, price: productPrice, image: card.querySelector("img").getAttribute("src"), quantity: 1 });
      renderCart();
      button.textContent = "Ajouté ✓";
      setTimeout(() => { button.textContent = "Ajouter au panier"; }, 1400);
    });
  });

  cartButton.addEventListener("click", () => setCartVisibility(true));
  closeCartButton.addEventListener("click", () => setCartVisibility(false));
  cartOverlay.addEventListener("click", () => setCartVisibility(false));

  document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "Merci ✓";
    event.currentTarget.querySelector("input").value = "";
  });

  document.querySelector(".contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.querySelector("button").innerHTML = "Message envoyé ✓";
    event.currentTarget.reset();
  });
});
