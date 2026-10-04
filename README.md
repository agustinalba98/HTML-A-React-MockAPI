# Bendito Arte — E-commerce

Tienda de productos sublimados personalizados (remeras, tazas, botellas y más).
Segunda entrega: migración del HTML/CSS de la primera entrega a **React + React Router**,
con datos reales desde **MockAPI**.

## Tecnologías utilizadas

- React 19 + Vite
- React Router DOM (navegación entre vistas)
- React Hook Form (validación de formularios)
- Axios (peticiones HTTP a MockAPI)
- SweetAlert2 (alertas de éxito/error)
- FontAwesome (`@fortawesome/react-fontawesome`, iconos sólidos, regulares y de marcas)
- CSS propio (sin Bootstrap)

## Estructura

```text
src/
├── assets/images
├── components/
│   ├── product-card/ProductCard.jsx
│   ├── product-container/ProductContainer.jsx
│   ├── product-row/ProductRow.jsx
│   └── ui/ (Button.jsx, Loader.jsx)
├── layout/
│   ├── header/Header.jsx
│   └── footer/Footer.jsx
├── pages/
│   ├── home/Home.jsx
│   ├── products/Products.jsx
│   ├── product-detail/ProductDetail.jsx
│   ├── register/Register.jsx
│   ├── login/Login.jsx
│   ├── about/About.jsx
│   ├── contact/Contact.jsx
│   ├── admin/products/AdminProducts.jsx
│   ├── admin/users/AdminUsers.jsx
│   └── not-found/NotFound.jsx
├── services/
│   ├── products.service.js  ← CRUD de productos contra MockAPI
│   └── users.service.js     ← CRUD de usuarios contra MockAPI
├── App.jsx (rutas)
└── main.jsx
```

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Home (banner, hero, destacados, beneficios) |
| `/products` | Catálogo con filtros por categoría y precio |
| `/products/:id` | Detalle de producto (dinámico con `useParams`) |
| `/register` | Registro con validaciones + `POST /users` |
| `/login` | Login (muestra datos en `console.log`) |
| `/about` | Acerca de |
| `/contact` | Contacto con mapa y tarjetas |
| `/cart` | Canasta (contexto Order: ver, cambiar cantidades, vaciar, finalizar) |
| `/admin/products` | CRUD de productos |
| `/admin/users` | CRUD de usuarios |

## Pasos para clonar e instalar

```bash
git clone https://github.com/tu-usuario/ecommerce-react
cd ecommerce-react
npm install
npm run dev
```

La app corre en `http://localhost:5173` por defecto.

## MockAPI

Base URL configurada en `src/services/products.service.js`:

```text
https://6ab063dbee9c55c910bfa5c7.mockapi.io
```

Recursos:

- `products`: `name`, `price`, `description`, `image`, `category`, `createdAt` (+ `stock`)
- `users`: `name`, `email`, `password`, `birthDate`, `province`
