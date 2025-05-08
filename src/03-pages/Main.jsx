import React from 'react';
import MainBanner from '../02-components/MainBanner';
import HotelSlider from '../02-components/HotelSlider';
import domesticHotels from '../04-data/mainHotellist.json';
import overseasHotels from '../04-data/mainHotellist2.json';

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
