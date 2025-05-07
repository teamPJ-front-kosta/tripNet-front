import React from 'react';
import MainBanner from '../components/MainBanner';
import HotelSlider from '../components/HotelSlider';
import domesticHotels from '../data/mainHotellist.json';
import overseasHotels from '../data/mainHotellist2.json';

function Main() {
  return (
    <main>
      <MainBanner />

      {/* 국내 추천 호텔 섹션 */}
      <HotelSlider title="국내 추천 호텔" hotelData={domesticHotels} />

      {/* 해외 추천 호텔 섹션 */}
      <HotelSlider title="해외 추천 호텔" hotelData={overseasHotels} />
    </main>
  );
}

export default Main;
