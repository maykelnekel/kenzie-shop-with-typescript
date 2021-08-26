import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import formatValue from "../../utils/formatValue";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, ProductList } from "./styles";
import { useCart } from "../../Providers/Cart";
import { Product } from "../../Interfaces/index";

function Home() {
  const { setCart, cart } = useCart();

  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [loading, setLoading] = useState<Boolean>(true);

  async function loadProducts() {
    const response = await api.get("/products/");

    const data = response.data.map((product: Product) => ({
      ...product,
      priceFormatted: formatValue(product.price),
    }));
    console.log(typeof data);
    setLoading(false);
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <ProductList>
          {products.map((product) => (
            <li key={product.id}>
              <figure>
                <img src={product.image_url} alt={product.name} />
              </figure>
              <strong>{product.name}</strong>
              <div>
                <span>{formatValue(product.price)}</span>

                <button
                  type="button"
                  onClick={() => setCart([...cart, product])}
                >
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </li>
          ))}
        </ProductList>
      )}
    </Container>
  );
}

export default Home;
