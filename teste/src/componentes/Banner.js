import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Banner.css';

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/banners')
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar banners:', error);
      });
  }, []);

  return (
    <div className="banner">
      <Carousel showThumbs={false}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <img className="img"src={`http://localhost:3000/uploads/${banner.image}`} alt={banner.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;