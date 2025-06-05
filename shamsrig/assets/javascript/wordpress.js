function checkShopDomainAndToggle() {
  const isShop = window.location.hostname === "shop.shamsrig.com";
  const shopBtns = document.querySelectorAll(".shop-btn");

  shopBtns.forEach(btn => {
    if (isShop) {
      if (!btn.classList.contains("active")) {
        btn.classList.add("active");
      }
    } else {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    }
  });
}

// Initial check on page load
document.addEventListener("DOMContentLoaded", () => {
  checkShopDomainAndToggle();
  setInterval(checkShopDomainAndToggle, 1000); // repeat every second
});
