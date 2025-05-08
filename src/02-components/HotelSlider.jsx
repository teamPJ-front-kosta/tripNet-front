import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './HotelSlider.scss';

// 🔁 재사용 가능하도록 title과 hotelData를 props로 받음
const HotelSlider = ({ title, hotelData }) => {
  return (
    <div className="hotel-slider-wrapper">
      <h2 className="section-title">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        className="hotel-slider"
      >
        {hotelData.map((hotel) => (
          <SwiperSlide key={hotel.id}>
            <div className="hotel-card">
              <img src={hotel.imageUrl} alt={hotel.name} />
              <div className="info">
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <p>{hotel.price.toLocaleString()} {hotel.currency}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelSlider;
