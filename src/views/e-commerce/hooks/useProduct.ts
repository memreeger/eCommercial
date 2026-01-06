// import { useEffect, useState } from "react";
// import type { Product } from "../types/product";
// import { getProducts } from "../../../services/fakestoreapi/productService";

// export const useProducts = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getProducts()
//             .then((res) => setProducts(res.data))
//             .finally(() => setLoading(false));
//     }, []);

//     return { products, loading };
// };
