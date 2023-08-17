## Ivy Shopify Plus Integration

In order to integrate Ivy into your Shopify Plus store, please follow these steps:

**1. Add theme files**

Please add the `ivy-express-button.liquid` theme file from this repository to the snippets folders in the corresponding theme. The folder structure should look like so:

```bash
snippets
├── ivy-express-button.liquid
```

**2. Add the Ivy Buttons to your Theme**

Add the following code snippets corresponding to the desired location of the button to your theme code:

Cart

```liquid
{% render 'ivy-express-button', type: 'cart' %}

```

PDP

```liquid
{%- if product.available %}
  {% render 'ivy-express-button', type: 'product' %}
{%- endif -%}
```

Checkout

Place the following code underneath the `{{ alternative_payment_methods }}` snippet in the checkout.liquid file:

```liquid
{% if content_for_layout contains 'data-step="contact_information"' %}
  <li id="ivy_express_button_container" style="display: none">
    {% render 'ivy-express-button', type: 'cart', is_checkout: true %}
  </li>
  <style>
    .ivy-checkout-button {
      margin-top: 0;
      margin-bottom: 13px;
    }
    @media screen and (max-width: 749px) {
      .ivy-checkout-button {
        margin-top: 8px;
      }
    }
  </style>
  <script>
    (function($) {
      $(document).on("page:load page:change", function() {
        const elementToObserve = document.querySelector(".dynamic-checkout");
      
        const observer = new MutationObserver(() => {
          let shopify_express_buttons = document.querySelector(".dynamic-checkout__buttons ul");
          let check_for_ivy_button = document.querySelector(".dynamic-checkout__buttons ul #ivy_express_button_container");
          if(shopify_express_buttons !== null && check_for_ivy_button === null) {
            let ivy_express_button_container = document.getElementById("ivy_express_button_container");
            ivy_express_button_container.remove();
            ivy_express_button_container.style = null;
            shopify_express_buttons.appendChild(ivy_express_button_container);
          }
        });
        
        observer.observe(elementToObserve, { subtree: true, childList: true });
      });
    })(Checkout.$);
  </script>
{% endif %}
```

**5. Add script to "Additional Checkout Scripts"**

Paste the following code snippet into the "Additional Checkout Scripts" section of your Shopify store. This will clear the cart after the order is placed.

```liquid
{% if order.attributes["first_time_accessed"] %}
    <script>
        fetch("https://" + Shopify.shop + "/cart/clear.js");

        const data = {
            id: {{ order.id }},
        }

        fetch("{{ settings.ivy_gateway_url }}/order/update", { "body": JSON.stringify(data), "method": "POST", "headers": { "Content-Type": "application/json" } });
    </script>
{% endif %}
```

**7. Activate the App**

Now that you have added all necessary code snippets, you need to retrieve all relevant secrets in order to go live. Please Contact the [Ivy support](https://form.typeform.com/to/ljnbWyS2) in order to finish up the integration.

**OPTIONAL: Add Ivy to the Standard Checkout (Shopify Plus only)**

1. Create a manual payment method with the name "Ivy"

2. Add the `ivy-checkout.liquid` and `ivy-checkout-pm-step.liquid` files from this repository to the snippets folder of the corresponding theme:

```bash
snippets
├── ivy-checkout.liquid
├── ivy-checkout-pm-step.liquid
```

3. Add the following code snippets anywhere to your `checkout.liquid` file to enable your customers to pay green in the checkout:

  a. __Default Shopify behaviour__: If the payment is started after the order review step:

  ```liquid
  {% render 'ivy-checkout' %}
  ```

  b. If the payment is started after the payment method step:

  **Remember to insert the id of Ivy payment method in line 173 of `ivy-checkout-pm-step.liquid`!** You can find the id by looking at the html code of the manual payment method in the checkout.

  ```liquid
  {% render 'ivy-checkout-pm-step' %}
  ```

4. OPTIONAL - Manually trigger a variant selection.
  Some shops will have a variant selection form that will not automatically update the selected variant in the liquid checkout state. Therefore, in some cases, you might need to do this manually. If you encounter this issue, you can adjust the URL search params to include a `variant` property. For example:
  ```liquid
<div
  onclick="selectVariant('{{ all_products[product.handle].variants[variant_index].id }}')"  
>...</div>
<script>
  function selectVariant(variantId) {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("variant", variantId);
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({path:newUrl},'',newUrl);
  }
</script>
```
