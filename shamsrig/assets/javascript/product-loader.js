document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  fetch("assets/data/product-data.json")
    .then(res => res.json())
    .then(data => {
      const product = data.find(p => p.id === productId);
      if (!product) return;

      // Basic info
      document.getElementById("pr-name").textContent = product.name;
      document.getElementById("pr-description").textContent = product.description;
      document.getElementById("pr-price").textContent = product.price;
      document.getElementById("pr-category").textContent = product.category;

      // Features
      document.getElementById("pr-features").innerHTML = product.features.join("");

      // Main image
      const mainImg = document.querySelector("#pr-main-image img");
      mainImg.src = product.product_image;

      // Gallery
      const gallery = document.getElementById("pr-gallery-thumbnails");
      product.gallery_images.forEach((img, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${img}" class="${index === 0 ? 'active' : ''}" />`;
        li.querySelector("img").addEventListener("click", () => {
          mainImg.src = img;
          document.querySelectorAll("#pr-gallery-thumbnails img").forEach(i => i.classList.remove("active"));
          li.querySelector("img").classList.add("active");
        });
        gallery.appendChild(li);
      });

      // Checkout button
      document.getElementById("pr-checkout-btn").addEventListener("click", () => {
        window.location.href = `checkout.html?id=${product.id}`;
      });
    });
});
