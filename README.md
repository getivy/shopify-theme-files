## Ivy Shopify Plus Integration

In order to integrate Ivy into your Shopify Plus store, please follow these steps:

**1. Add theme files**

Please add the theme files from this repository to the corresponding folders:

```bash
assets
├── ivy-express.js
...

snippets
├── ivy-express-button.liquid
├── ivy-checkout.liquid
...

```

**2. Add Ivy Buttons to Theme**

Cart

```liquid
{% render 'ivy-express-button', type: 'cart' %}

```

PDP

```liquid
{%- if product.available %}
{% render 'ivy-express-button', type: 'product', handle: product.handle, variantId: product.selected_or_first_available_variant.id %}
{%- endif -%}
```

Checkout

```liquid
{% render 'ivy-express-button', type: 'cart', is_checkout: true %}
```

**3. Add Ivy to the Standard Checkout**

1. Create a manual payment method with the name "Ivy"

2. Add the following code snippets to the `checkout.liquid` to enable your customers to pay green in the checkout:

If the payment is started after the payment method step:

```liquid
{% render 'ivy-checkout-pm-step' %}
```

If the payment is started after the order review step (default Shopify behaviour):

```liquid
{% render 'ivy-checkout-review-step' %}
```

**4. Add script to "Additional Checkout Scripts"**

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

**5. Add this to into the array of your your config/settings_schema.json file and exchange {YOUR_SPECIFIC_API_URL} with your api-endpoint:**

```json
...
  {
    "name": "Ivy Settings",
    "settings": [
      {
        "type": "text",
        "id": "ivy_gateway_url",
        "label": "The shop specific url for the Ivy api",
        "default": "{YOUR_SPECIFIC_API_URL}"
      }
    ]
  },
...
```
