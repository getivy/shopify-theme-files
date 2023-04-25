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

```liquid
{% render 'ivy-express-button', type: 'cart', is_checkout: true %}
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

Now that you have added all necessary code snippets, you need to retrieve all relevant secrets in order to go live. Please Contact the [Ivy support]('https://form.typeform.com/to/ljnbWyS2') in order to finish up the integration.

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
