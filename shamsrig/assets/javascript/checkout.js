document.addEventListener("DOMContentLoaded", () => {
  const billingForm = document.getElementById("billing-form");
  const paymentSection = document.getElementById("payment-section");
  const saveBtn = document.getElementById("save-details");
  const submitOrderBtn = document.getElementById("submit-order");

  let orderData = {};

  // Load product summary from JSON using localStorage
  const productId = localStorage.getItem("selectedProduct");
  if (productId) {
    fetch("assets/data/product-data.json")
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p.id === productId);
        if (!product) return;

        document.getElementById("summary-image").src = product.product_image;
        document.getElementById("summary-name").textContent = product.name;
        document.getElementById("summary-price").textContent = product.price;

        orderData.product = {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      });
  }

  // Save billing and show payment
  saveBtn.addEventListener("click", () => {
    const formData = new FormData(billingForm);
    const fields = ["fullname", "email", "phone", "address", "city", "zipcode"];
    for (const field of fields) {
      if (!formData.get(field)) {
        alert("Please fill in all billing details.");
        return;
      }
    }

    fields.forEach(key => {
      orderData[key] = formData.get(key);
    });

    const now = new Date();
    const pkTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "medium"
    }).format(now);
    orderData.timestamp = pkTime;

    paymentSection.classList.add("show");
    window.scrollTo({ top: paymentSection.offsetTop - 20, behavior: "smooth" });
  });

  // Submit Order
  submitOrderBtn.addEventListener("click", async () => {
    const fileInput = document.getElementById("payment-proof");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please upload your payment screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("order", JSON.stringify(orderData));

    try {
      const res = await fetch("process-order.php", {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      if (result.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("selectedProduct");
        window.location.href = "thank-you.html";
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  });
});
