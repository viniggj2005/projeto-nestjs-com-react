import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../../User/Userinfo/Userinfo';
import jwt_decode from 'jwt-decode';

const Myshopping = () => {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [data, setData] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const userId = decodedToken?.sub;

  useEffect(() => {
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt_decode(storedToken);
      setDecodedToken(decodedToken);
    }
  }, []); 

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.REACT_APP_HOST}/purchases/${userId}/comprado`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const groupedProducts = {};
    data.forEach((product) => {
      const updatedAt = new Date(product.updatedAt);
      const key = updatedAt.toISOString().substring(0, 16);
      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          date: updatedAt,
          products: [],
        };
      }
      groupedProducts[key].products.push(product);
    });
    setGroupedProducts(groupedProducts);
  }, [data]);

  return (
    <div>
      <h1>Minhas Compras</h1>
      {Object.values(groupedProducts).map((group) => (
        <div key={group.date}>
        <h4>Comprado dia: {group.date.getDate()}/{group.date.getMonth() + 1}</h4>
          <ul>
            {group.products.map((product) => (
              <li key={product.id}>
                <img src={`${process.env.REACT_APP_HOST}/uploads/${product.image.path}`} alt="Imagem da compra" />
                <p>Status: {product.status}</p>
                <p>Quantidade: {product.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Myshopping;
