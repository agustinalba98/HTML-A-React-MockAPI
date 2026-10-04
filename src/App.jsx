import './App.css'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Cart from './pages/cart/Cart'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Header from './layout/header/header'
import Footer from './layout/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import AdminProducts from './pages/admin/products/AdminProducts'
import AdminUsers from './pages/admin/users/AdminUsers'
import ProductDetail from './pages/product-detail/ProductDetail'
import NotFound from './pages/not-found/NotFound'
import CartSidebar from './components/cart/CartSidebar'


function App() {
  return (
    <>
      <Header />

      <main className="main-container">
        <Routes>
          {/* Rutas públicas — las más específicas antes que las generales */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/product-detail/:name/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          {/* Rutas de administración */}
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <CartSidebar />
    </>
  )
}

export default App
