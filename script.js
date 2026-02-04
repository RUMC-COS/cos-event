const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click',() => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click',() => {
        nav.classList.remove('active')
    })
}


// ---------- ADD TO CART (ALL PRODUCT PAGES) ----------
const addToCartBtns = document.querySelectorAll(".add-to-cart");

addToCartBtns.forEach(button => {
  button.addEventListener("click", () => {
    const quantityInput = document.getElementById("quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      quantity: quantity,
      image: button.dataset.image
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
    window.location.href = "cart.html";
  });
});



// ---------- CART PAGE ----------
const cartTable = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartTable) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      cartTable.innerHTML += `
        <tr>
          <td>
            <a href="#" onclick="removeItem(${index})">
              <i class="fa fa-times-circle"></i>
            </a>
          </td>
          <td><img src="${item.image}" /></td>
          <td>${item.name}</td>
          <td>RM${item.price.toFixed(2)}</td>
          <td>
            <input type="number" min="1" value="${item.quantity}"
              onchange="updateQuantity(${index}, this.value)">
          </td>
          <td>RM${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });

    cartTotal.textContent = `Total: RM${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.updateQuantity = (index, qty) => {
    cart[index].quantity = parseInt(qty);
    renderCart();
  };

  window.removeItem = (index) => {
    cart.splice(index, 1);
    renderCart();
  };

  renderCart();

  const checkoutBtn = document.getElementById("checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            window.location.href = "checkout.html";
        });
    }

}


// ---------- CHECKOUT PAGE ----------
document.addEventListener("DOMContentLoaded", () => {
    const checkoutTotalDiv = document.getElementById("checkout-total");
    const orderForm = document.getElementById("orderForm");
    const orderSummaryField = document.getElementById("order_summary");
    const orderTotalField = document.getElementById("order_total");
  
    // Only run on checkout page
    if (!checkoutTotalDiv) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function renderCheckout() {
        let total = 0;
        let orderText = "ORDER SUMMARY:\n\n";
      
        cart.forEach(item => {
          const subtotal = item.price * item.quantity;
          total += subtotal;
          orderText += `${item.name} x${item.quantity} — RM${subtotal.toFixed(2)}\n`;
        });
      
        orderText += `\nTOTAL: RM${total.toFixed(2)}`;
      
        // Show total on page
        if (checkoutTotalDiv) {
          checkoutTotalDiv.textContent = `Total Amount: RM${total.toFixed(2)}`;
        }
      
        // Fill visible order box
        const orderDetailsBox = document.getElementById("order_details");
        if (orderDetailsBox) {
          orderDetailsBox.value = orderText;
          orderDetailsBox.style.height = "150px";
        }
      
        // Hidden fields (optional but fine to keep)
        if (orderSummaryField) orderSummaryField.value = orderText;
        if (orderTotalField) orderTotalField.value = `RM${total.toFixed(2)}`;
      }
      
  
    renderCheckout();
  
    if (orderForm) {
      orderForm.addEventListener("submit", () => {
        setTimeout(() => {
          localStorage.removeItem("cart");
          alert("Order submitted successfully!");
        }, 500);
      });
    }
  });
  
