document.addEventListener("DOMContentLoaded", () => {
  const expressButtons = document.querySelectorAll("button.ivy-express-checkout");

  expressButtons.forEach((button) => {

    button.addEventListener('click', () => {

      let fetchUrl = null;

      if(button.dataset.type === 'cart') {
        fetchUrl = "/cart?view=ivy";
      } else if(button.dataset.type === 'product' && button.dataset.product && button.dataset.shopifyVariant) {
        fetchUrl = "/products/" + button.dataset.product + "?variant=" + button.dataset.shopifyVariant + "&view=ivy";
      }

      if(fetchUrl !== null) {
        fetch(fetchUrl)
        .then((response) => response.json())
        .then((cartData) => {
          fetch('{ custom_ivy_url }/checkout/express/create', {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartData),
          })
          .then((response) => response.json())
          // .then((checkoutSessionData) => { window.location.href = checkoutSessionData.redirectUrl; })
          .then((checkoutSessionData) => { startIvyCheckout(checkoutSessionData.redirectUrl, 'popup'); })
          .catch((error) => console.error("Error:", error));
        });

      };

    });

  });

});