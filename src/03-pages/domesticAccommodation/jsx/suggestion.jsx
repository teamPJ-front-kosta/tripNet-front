import React, { useState, useEffect } from "react";
import styles from "../css/styles.module.css";
import EventCard from '../../../02-components/EventCard';
import HotelListSection from "../../../02-components/HotelListSection";

function Suggestion() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedHotels, setRecommendedHotels] = useState([]);

  useEffect(() => {
    fetchRecommendedHotels();
  }, []);

  const fetchRecommendedHotels = async () => {
    setLoading(true);
    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = localStorage.getItem('accessToken');
      
      const response = await fetch("/api/domestic-accommodations", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // API 응답 데이터 변환 - 각 도시별로 3개의 호텔 선택
      const hotelCards = data.flatMap((cityData) =>
        cityData.hotels?.slice(0, 3).map(hotel => ({
          id: hotel.hotelId,
          cityCode: cityData.cityCode,
          title: hotel.hotelName,
          subtitle: cityData.cityName,
          imageUrl: hotel.imageUrl,
          alt: `${hotel.hotelName} 이미지`,
          linkUrl: `/hotel/${cityData.cityCode}/${hotel.hotelId}`,
        }))
      );

      setRecommendedHotels(hotelCards);
      setError(null);
    } catch (err) {
      console.error("호텔 데이터 가져오기 실패:", err);
      setError("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");

      // 에러 발생 시 기본 데이터 설정 - 각 도시별 3개씩
      setRecommendedHotels([
        // 서울 호텔
        {
          id: 1,
          cityCode: "SEL",
          title: "서울 센터 호텔",
          subtitle: "서울",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "서울 센터 호텔 이미지",
          linkUrl: "/hotel/SEL/1",
        },
        {
          id: 2,
          cityCode: "SEL",
          title: "서울 그랜드 호텔",
          subtitle: "서울",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "서울 그랜드 호텔 이미지",
          linkUrl: "/hotel/SEL/2",
        },
        {
          id: 3,
          cityCode: "SEL",
          title: "서울 스카이 호텔",
          subtitle: "서울",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "서울 스카이 호텔 이미지",
          linkUrl: "/hotel/SEL/3",
        },
        // 부산 호텔
        {
          id: 4,
          cityCode: "PUS",
          title: "부산 해변 호텔",
          subtitle: "부산",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "부산 해변 호텔 이미지",
          linkUrl: "/hotel/PUS/4",
        },
        {
          id: 5,
          cityCode: "PUS",
          title: "부산 마린 호텔",
          subtitle: "부산",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "부산 마린 호텔 이미지",
          linkUrl: "/hotel/PUS/5",
        },
        {
          id: 6,
          cityCode: "PUS",
          title: "부산 센트럴 호텔",
          subtitle: "부산",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "부산 센트럴 호텔 이미지",
          linkUrl: "/hotel/PUS/6",
        },
        // 제주 호텔
        {
          id: 7,
          cityCode: "CJU",
          title: "제주 리조트",
          subtitle: "제주",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "제주 리조트 이미지",
          linkUrl: "/hotel/CJU/7",
        },
        {
          id: 8,
          cityCode: "CJU",
          title: "제주 그랜드 호텔",
          subtitle: "제주",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "제주 그랜드 호텔 이미지",
          linkUrl: "/hotel/CJU/8",
        },
        {
          id: 9,
          cityCode: "CJU",
          title: "제주 오션 호텔",
          subtitle: "제주",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
          alt: "제주 오션 호텔 이미지",
          linkUrl: "/hotel/CJU/9",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HotelListSection
      loading={loading}
      error={error}
      hotels={recommendedHotels}
    />
  );
}

export default Suggestion;
