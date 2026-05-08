# 📱 iStore — Guía del Proyecto (actualizada)

## Estructura de carpetas

```
src/
├── components/
│   ├── App.jsx           ← Raíz de la app (navegación + estado global)
│   ├── Navbar.jsx        ← Barra de navegación fija (menú hamburguesa mobile)
│   ├── Footer.jsx        ← Pie de página (links a Instagram y WhatsApp)
│   ├── HomePage.jsx      ← Página de inicio (5 secciones — ver detalle abajo)
│   ├── ProductsPage.jsx  ← Catálogo con filtros (iPhones / AirPods / Cargadores)
│   ├── NosotrosPage.jsx  ← Página "Quiénes Somos"
│   ├── ProductCard.jsx   ← Tarjeta de producto (frente/dorso)
│   ├── ProductModal.jsx  ← Modal de detalle completo de un producto
│   ├── CartDrawer.jsx    ← Panel lateral del carrito de compras
│   └── CheckoutModal.jsx ← Modal de confirmación (genera mensaje WhatsApp)
│
├── data/
│   └── products.js       ← ⭐ CATÁLOGO DE PRODUCTOS (editar aquí precios, imágenes, etc.)
│
├── hooks/
│   └── useCart.js        ← Lógica del carrito (agregar, quitar, cantidades)
│
├── styles/
│   └── global.css        ← Variables CSS globales y estilos base
│
└── main.jsx              ← Punto de entrada — monta React en el DOM
```

---

## ⭐ Dónde está cada cosa importante

### Productos — `src/data/products.js`
**Es el archivo más importante para el contenido.**

```js
export const products = {
  iphones:    [ ... ],  // Lista de iPhones
  airpods:    [ ... ],  // Lista de AirPods
  cargadores: [ ... ],  // Lista de cargadores y cables
};

export const allProducts = [...]; // Array plano con todos (para el carrusel infinito)
```

**Estructura de cada producto:**
```js
{
  id: 'ip1',                    // ID único (no repetir)
  name: 'iPhone 16 Pro Max',    // Nombre que aparece en la card
  serie: 'iPhone 16',           // Para filtros de serie
  cat: 'iPhone',                // Categoría (iPhone / AirPods / Cargador / Cable)
  badge: 'new',                 // 'new', 'hot', o '' (vacío = sin badge)
  storage: ['256GB', '512GB'],  // Opciones de storage ([] si no aplica)
  priceUSD: 1299,               // Precio en dólares
  colors: ['#2c2c2e', ...],     // Colores disponibles (se muestran como puntos)
  img: 'https://...',           // URL de la imagen
  desc: 'Descripción corta...', // Descripción en dorso de card y modal
  specs: [                      // Tabla de specs en el modal
    ['Pantalla', '6.9" OLED'],
    ['Chip', 'A18 Pro'],
  ],
  tipo: 'Pro',                  // Para filtros de tipo
}
```

**Variables globales importantes:**
```js
export const USD_TO_ARS = 1200;        // ← Tipo de cambio (modificar cuando cambie)
export const WA_NUMBER = '549351...';  // ← Número de WhatsApp (formato: 549 + código + número)
```

---

### Carrito — `src/hooks/useCart.js`

```js
const { cart, addToCart, removeFromCart, changeQty, clearCart, totalItems, totalUSD } = useCart();
```

| Función | Qué hace |
|---|---|
| `addToCart(product, storage)` | Agrega un producto al carrito |
| `removeFromCart(key)` | Elimina un item del carrito |
| `changeQty(key, delta)` | Cambia la cantidad (+1 o -1) |
| `clearCart()` | Vacía el carrito |
| `totalItems` | Número total de items (badge del navbar) |
| `totalUSD` | Precio total en dólares |

---

### Navegación — `src/components/App.jsx`

| ID | Componente | Descripción |
|---|---|---|
| `'home'` | `HomePage` | Página de inicio |
| `'iphones'` | `ProductsPage` | Catálogo de iPhones |
| `'airpods'` | `ProductsPage` | Catálogo de AirPods |
| `'cargadores'` | `ProductsPage` | Catálogo de cargadores |
| `'nosotros'` | `NosotrosPage` | Página "Quiénes somos" |

Para agregar una nueva sección: agregar el link en `Navbar.jsx` → `NAV_LINKS`, y el renderizado en `App.jsx`.

---

### Filtros del catálogo — `src/components/App.jsx`

```js
const FILTER_CONFIG = {
  iphones: [
    { key: 'serie',   label: 'Serie',   options: ['Todos', 'iPhone 16', 'iPhone 15'] },
    { key: 'storage', label: 'Storage', options: ['Todos', '128GB', '256GB'] },
  ],
  airpods: [
    { key: 'tipo', label: 'Tipo', options: ['Todos', 'AirPods', 'AirPods Pro', 'AirPods Max'] },
  ],
  cargadores: [
    { key: 'tipo', label: 'Tipo', options: ['Todos', 'MagSafe', 'USB-C', 'Cable'] },
  ],
};
```

---

### Checkout / WhatsApp — `src/components/CheckoutModal.jsx`
Genera un mensaje de WhatsApp con el resumen del pedido.
El número de destino se define en `products.js` (`WA_NUMBER`).

**Campos del formulario:**
- Nombre y apellido *(requerido)*
- Teléfono / WhatsApp *(requerido)*
- Forma de entrega: **Retiro personal** o **Envío a domicilio** *(requerido)*
  - Si elige envío, aparece un campo de dirección *(requerido)*
- Forma de pago: **Efectivo**, **Tarjeta** o **Transferencia** *(requerido)*
- Nota adicional *(opcional)*

---

## 🎨 Variables CSS globales — `src/styles/global.css`

```css
--primary:    #1d1d1f;  /* Color principal (textos, fondos oscuros) */
--accent:     #0071e3;  /* Azul Apple (botones, precios, activos) */
--silver:     #f5f5f7;  /* Gris claro (fondos de secciones) */
--text-muted: #6e6e73;  /* Texto secundario / subtítulos */
--border:     #d2d2d7;  /* Color de bordes */
--whatsapp:   #25d366;  /* Verde WhatsApp */
--nav-height: 56px;     /* Alto del navbar (64px en desktop) */
```

---

## 📦 Resumen de componentes

### `Navbar.jsx`
- Barra fija en la parte superior con blur/glassmorphism
- **Mobile**: logo + carrito + hamburguesa → menú desplegable desde arriba
- **Desktop**: todos los links visibles en línea
- Badge rojo en el carrito cuando hay items

### `HomePage.jsx`
Tiene **5 secciones** en este orden:

1. **Hero** — Banner oscuro con título, subtítulo y botón "Ver iPhones →"
2. **Carrusel infinito** — Todos los productos desfilando automáticamente. Se pausa con hover. Click en un producto abre el `ProductModal`
3. **Populares** — Grid de flip cards (`ProductCard`) con los más vendidos
4. **About cards** — 6 tarjetas de propuesta de valor (entrega, atención, envío, soporte, pago, originales)
5. **CTA Contacto** — Sección oscura "¿No encontrás lo que buscás?" con botón directo a WhatsApp

### `ProductsPage.jsx`
- Recibe `items`, `filterConfig`, `title` desde `App.jsx`
- **Mobile**: botón "⚙️ Filtros" que despliega los chips de filtro
- **Desktop**: sidebar de filtros a la izquierda, grid de productos a la derecha
- Muestra `ProductCard` por cada producto filtrado

### `ProductCard.jsx`
Flip card 3D con dos caras:
- **Frente**: imagen del producto, puntos de colores, nombre, precio, hint "Ver más"
- **Dorso** (fondo oscuro `#1d1d1f`): categoría, nombre, descripción, precio USD/ARS y botón único **"Ver más →"**
  - El botón abre el `ProductModal` con el primer storage seleccionado por defecto
- **Desktop**: flip al hacer hover
- **Mobile**: flip al hacer tap en la card, luego tap en "Ver más" abre el modal

> ⚠️ El dorso ya **no muestra** specs (pantalla/chip) ni selector de storage.
> Toda esa info vive exclusivamente en el `ProductModal`.

### `ProductModal.jsx`
- **Mobile**: ocupa casi toda la pantalla, sube desde abajo
- **Desktop**: modal centrado (max 900px)
- Contenido: imagen, categoría, nombre, descripción, **selector de storage**, precio USD y ARS, tabla de specs completa, botón **"Agregar al carrito"**

### `CartDrawer.jsx`
- **Mobile**: panel que sube desde abajo (92dvh)
- **Desktop**: panel lateral desde la derecha (420px)
- Lista items con foto, nombre, storage, cantidades (+/−) y precio
- Muestra subtotal USD, subtotal ARS y total
- Botón "Confirmar por WhatsApp" → abre `CheckoutModal`

### `CheckoutModal.jsx`
- Fondo oscuro (`#111`) con overlay blur
- Muestra resumen del pedido arriba
- Formulario con nombre, teléfono, forma de entrega (con campo de dirección condicional), forma de pago y nota
- Al confirmar genera un mensaje pre-armado y abre WhatsApp

### `Footer.jsx`
- Fondo `--primary` (oscuro)
- Izquierda: logo, tagline, copyright
- Derecha: links a Instagram y WhatsApp
- **Para cambiar los links**: editar directamente las URLs en `Footer.jsx` y también en `NosotrosPage.jsx`

---

## 🚀 Cómo agregar un producto nuevo

1. Abrir `src/data/products.js`
2. Ir al array correspondiente (`iphones`, `airpods` o `cargadores`)
3. Copiar un objeto existente y modificar los campos
4. El `id` debe ser único (ej: `'ip9'`, `'ap4'`, `'cg5'`)
5. La imagen puede ser una URL pública o un archivo en `/public/`
6. Guardar — aparece automáticamente en el catálogo y en el carrusel

---

## ⚠️ Checklist antes de publicar

- [ ] Cambiar `WA_NUMBER` en `products.js` por el número real del cliente
- [ ] Verificar `USD_TO_ARS` con el tipo de cambio actual
- [ ] Actualizar el link de Instagram en `Footer.jsx` y `NosotrosPage.jsx`
- [ ] Actualizar el link de WhatsApp en `Footer.jsx`
- [ ] Reemplazar imágenes de productos si se usan fotos propias (subir a `/public/`)
- [ ] Revisar los textos de "Quiénes Somos" en `NosotrosPage.jsx`