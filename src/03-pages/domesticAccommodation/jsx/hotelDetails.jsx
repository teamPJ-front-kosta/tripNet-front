import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/hotelDetails.module.css';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleReservation = (room, offer) => {
    setSelectedRoom({
      ...room,
      selectedOffer: offer
    });
    setShowReservationModal(true);
  };

  const confirmReservation = () => {
    if (!selectedRoom) return;

    // 예약 정보를 URL 파라미터로 전달
    const params = new URLSearchParams(searchParams);
    params.append('roomId', selectedRoom.id);
    params.append('offerId', selectedRoom.selectedOffer.id);
    params.append('roomName', selectedRoom.name);
    params.append('price', selectedRoom.selectedOffer.price);
    
    // 예약 페이지로 이동
    navigate(`/reservation?${params.toString()}`);
  };

  const getCityCode = (location) => {
    switch (location) {
      case '서울':
        return 'SEL';
      case '부산':
        return 'PUS';
      case '제주':
        return 'CJU';
      default:
        return location;
    }
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const location = searchParams.get('location');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const adults = searchParams.get('adults');
        const children = searchParams.get('children');
        const cityCode = getCityCode(location);

        const response = await axios.get(
          `http://localhost:3001/api/domestic-accommodations/search-hotels/${cityCode}/${checkIn}/${checkOut}/${adults}/${children}`
        );

        const hotelData = response.data.data;
        const selectedHotel = hotelData.find(item => item.hotel.hotelId === hotelId);

        if (selectedHotel) {
          setHotel({
            id: selectedHotel.hotel.hotelId,
            name: selectedHotel.hotel.name,
            type: `${selectedHotel.hotel.rating || '게스트하우스'}`,
            imageUrl: `/images/accommodation1.jpg`,
            description: selectedHotel.hotel.description?.text || '호텔 설명이 없습니다.',
            amenities: selectedHotel.hotel.amenities || []
          });

          // 객실 정보 설정
          const roomTypes = {};
          selectedHotel.offers.forEach(offer => {
            const roomCategory = offer.room.typeEstimated?.category || '스탠다드 룸';
            if (!roomTypes[roomCategory]) {
              roomTypes[roomCategory] = {
                id: offer.id,
                name: roomCategory,
                description: offer.room.description?.text || '객실 설명이 없습니다.',
                capacity: {
                  adults: offer.room.typeEstimated?.beds || adults,
                  children: children
                },
                amenities: offer.room.typeEstimated?.amenities || [],
                bedType: offer.room.typeEstimated?.bedType || '더블 베드',
                offers: []
              };
            }
            roomTypes[roomCategory].offers.push({
              id: offer.id,
              price: offer.price?.total || 0,
              taxIncluded: Math.floor(offer.price?.total * 1.1) || 0,
              boardType: offer.boardType || '조식 불포함',
              cancellationPolicy: offer.policies?.cancellation?.description || '취소 정책 정보가 없습니다.'
            });
          });

          setRooms(Object.values(roomTypes));
        } else {
          setError('호텔 정보를 찾을 수 없습니다.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hotel details:', err);
        setError('호텔 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId, searchParams]);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!hotel) return <div className={styles.error}>호텔 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.hotelDetailsContainer}>
      <div className={styles.imageSection}>
        <img src={hotel.imageUrl} alt={hotel.name} className={styles.mainImage} />
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.hotelName}>{hotel.name}</h1>
        <p className={styles.hotelType}>{hotel.type}</p>
        
        <div className={styles.description}>
          <h2>호텔 소개</h2>
          <p>{hotel.description}</p>
        </div>

        <div className={styles.amenities}>
          <h2>호텔 편의시설</h2>
          <div className={styles.amenitiesList}>
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className={styles.amenityItem}>{amenity}</span>
            ))}
          </div>
        </div>

        <div className={styles.roomsSection}>
          <h2>객실 정보</h2>
          {rooms.map(room => (
            <div key={room.id} className={styles.roomCard}>
              <div className={styles.roomHeader}>
                <h3 className={styles.roomName}>{room.name}</h3>
              </div>
              <div className={styles.roomDetails}>
                <p className={styles.roomDescription}>{room.description}</p>
                <div className={styles.roomInfo}>
                  <p>수용 인원: 성인 {room.capacity.adults}명{room.capacity.children > 0 ? `, 어린이 ${room.capacity.children}명` : ''}</p>
                  <p>침대 타입: {room.bedType}</p>
                </div>
                <div className={styles.roomAmenities}>
                  {room.amenities.map((amenity, index) => (
                    <span key={index} className={styles.amenityItem}>{amenity}</span>
                  ))}
                </div>
                <div className={styles.offersList}>
                  {room.offers.map((offer) => (
                    <div key={offer.id} className={styles.offerCard}>
                      <div className={styles.offerHeader}>
                        <span className={styles.boardType}>{offer.boardType}</span>
                        <div className={styles.offerPrice}>
                          <span className={styles.price}>{formatPrice(offer.price)}원/박</span>
                          <span className={styles.taxIncluded}>세금포함 {formatPrice(offer.taxIncluded)}원/박</span>
                        </div>
                      </div>
                      <p className={styles.cancellationPolicy}>{offer.cancellationPolicy}</p>
                      <button 
                        className={styles.bookButton}
                        onClick={() => handleReservation(room, offer)}
                      >
                        예약하기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showReservationModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>예약 확인</h2>
            <div className={styles.modalContent}>
              <p className={styles.modalRoomName}>{selectedRoom.name}</p>
              <p className={styles.modalBoardType}>{selectedRoom.selectedOffer.boardType}</p>
              <div className={styles.modalPrice}>
                <p className={styles.price}>{formatPrice(selectedRoom.selectedOffer.price)}원/박</p>
                <p className={styles.taxIncluded}>세금포함 {formatPrice(selectedRoom.selectedOffer.taxIncluded)}원/박</p>
              </div>
              <p className={styles.modalCancellation}>{selectedRoom.selectedOffer.cancellationPolicy}</p>
            </div>
            <div className={styles.modalButtons}>
              <button 
                className={styles.confirmButton}
                onClick={confirmReservation}
              >
                예약 진행하기
              </button>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowReservationModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails; 