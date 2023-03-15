## Ivy Shopify Plus Integration

In order to integrate Ivy into your Shopify Plus store, please follow these steps:

**1. Add theme files**

Please add the theme files from this repository to the corresponding folders:

assets
|--- ivy-express.js
...

snippets
|--- ivy-express-button.liquid
|--- ivy-checkout.liquid
...

templates
|--- products.ivy.liquid
|--- cart.ivy.liquid
...

**2. Add Ivy Buttons to Theme**

Cart

```liquid
{% render 'ivy-express-button', type: 'cart' %}
```

PDP

```liquid
{% render 'ivy-express-button', type: 'product', handle: product.handle, variantId: product.selected_or_first_available_variant.id %}
```

Checkout

```liquid
{% render 'ivy-express-button', type: 'cart', is_checkout: true %}
```

**3. Add Ivy to the Standard Checkout**

Add the following code snippet to the `checkout.liquid` to enable your customers to pay green in the checkout.

```liquid
{% render 'ivy-checkout' %}
```

**4. Add script to "Additional Checkout Scripts"**

```liquid
{% if order.attributes["first_time_accessed"] %}
    <script>
        fetch("https://" + Shopify.shop + "/cart/clear.js");

        const data = {
            id: {{ order.id }},
        }

        fetch("{ custom_ivy_url }/order/update", { "body": JSON.stringify(data), "method": "POST", "headers": { "Content-Type": "application/json" } });
    </script>
{% endif %}
```
