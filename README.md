## Ivy Shopify Plus Integration

In order to integrate Ivy into your Shopify Plus store, please follow these steps:

**1. Add theme files**

Please add the theme files from this repository to the corresponding folders:

ivy-express.js => assets

ivy-express-buttin.liquid => snippets

products.ivy.liquid & cart.ivy.liquid => templates

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

**5. Add Ivy to the normal Checkout**

Add the following code snippet to the `checkout.liquid` to enable your customers to pay green.

```liquid
{% render 'ivy-checkout' %}
```

**4. Add script to "Additional Checkout Scripts"**

```liquid
{% if order.attributes["first_time_accessed"] %}
    <script>
        fetch("https://" + Shopify.shop + "/cart/clear.js");
        fetch("https://netshake.io/ivy/express/updateOrder.php?id={{ order.id }}", {"mode": "cors"});
    </script>
{% endif %}
```
