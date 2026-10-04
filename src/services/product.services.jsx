// Compatibilidad: este archivo existía como product.services.jsx
// Re-exporta el servicio nuevo para no romper imports existentes.
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  BASE_URL,
} from "./products.service";

import { getProductById } from "./products.service";
// Alias histórico usado en ProductDetail.jsx
export const getProductByID = getProductById;
