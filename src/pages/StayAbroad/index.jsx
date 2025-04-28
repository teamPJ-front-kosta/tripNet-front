import React from 'react';
import styles from './styles.module.css';

const StayAbroad = () => {
  return (
    <div className={styles.mainClass}>

      <section className={styles.searchFilterSection}>
            <div className={styles.titleBar}>
                <h1 className="titleBarName">해외 숙소</h1>
            </div>

            <div className={styles.filterTab1}>
                <div className={styles.filterTab2}>
                    <div className={styles.hotelBtn}>
                        <div className={styles.hotelTextArea}>
                            <span className={styles.hotelText}>호텔·그 외</span>
                        </div>
                    </div>
                    <div className={styles.koreanGuestHouseBtn}>
                        <div className={styles.koreanGuestHouseTextArea}>
                            <span className={styles.koreanGuestHouseText}>한인민박</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.filterInput}>
                <div className={styles.searchInput}>
                    <div className={styles.whereInput}>
                        <div className={styles.whereInputArea}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" color="#141719" style={{marginRight: '12px'}}>
                                <path d="m18.875 20.475-5.55-5.55c-.5.383-1.075.692-1.725.925-.65.233-1.342.35-2.075.35-1.85 0-3.417-.646-4.7-1.938C3.542 12.97 2.9 11.4 2.9 9.55c0-1.85.642-3.421 1.925-4.713C6.108 3.546 7.675 2.9 9.525 2.9s3.421.646 4.713 1.937c1.291 1.292 1.937 2.863 1.937 4.713 0 .733-.112 1.425-.337 2.075a5.726 5.726 0 0 1-.913 1.7l5.575 5.6c.2.2.3.454.3.763 0 .308-.108.57-.325.787a1.101 1.101 0 0 1-.812.325c-.325 0-.588-.108-.788-.325ZM9.525 13.9c1.217 0 2.25-.421 3.1-1.263.85-.841 1.275-1.87 1.275-3.087s-.425-2.246-1.275-3.088c-.85-.841-1.883-1.262-3.1-1.262s-2.246.42-3.087 1.262c-.842.842-1.263 1.871-1.263 3.088s.421 2.246 1.263 3.087c.841.842 1.87 1.263 3.087 1.263Z"></path>
                            </svg>
                            <div className={styles.whereInputTextArea2}>
                                <span className={styles.whereInputText}>어디로 떠나시나요?</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whenInput}>
                        <div className={styles.whenInputArea}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" color="#141719" style={{marginRight: '12px'}}>
                                <path d="M5.075 22.2c-.633 0-1.17-.22-1.612-.662a2.195 2.195 0 0 1-.663-1.613V6.075c0-.633.221-1.171.663-1.613A2.194 2.194 0 0 1 5.075 3.8H6v-.95c0-.3.104-.55.312-.75.209-.2.463-.3.763-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h7.7v-.95c0-.3.104-.55.313-.75.208-.2.462-.3.762-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h.925c.633 0 1.171.22 1.613.662.441.442.662.98.662 1.613v13.85c0 .633-.22 1.171-.662 1.613-.442.441-.98.662-1.613.662H5.075Zm0-2.275h13.85V10H5.075v9.925Z"></path>
                            </svg>
                            <div className={styles.whenInputTextArea2}>
                                <span className={styles.whenInputText}>언제 떠나시나요?</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.guestInput}>
                        <div className={styles.guestInputArea}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" color="#141719" style={{marginRight: '12px'}}>
                                <path d="M12 12.25c-1.667 0-3.083-.583-4.25-1.75C6.583 9.333 6 7.917 6 6.25s.583-3.083 1.75-4.25C8.917.833 10.333.25 12 .25s3.083.583 4.25 1.75C17.417 3.167 18 4.583 18 6.25s-.583 3.083-1.75 4.25c-1.167 1.167-2.583 1.75-4.25 1.75Zm0-2.5c.967 0 1.783-.342 2.45-1.025.667-.683 1-1.508 1-2.475s-.333-1.792-1-2.475C13.783 2.592 12.967 2.25 12 2.25c-.967 0-1.792.342-2.475 1.025-.683.683-1.025 1.508-1.025 2.475s.342 1.792 1.025 2.475c.683.683 1.508 1.025 2.475 1.025Zm0 5.5c-3.533 0-6.708.875-9.525 2.625C-.342 19.625-.75 21.833-.75 24.5h2.5c0-2 .242-3.458.725-4.375.483-.917 1.392-1.708 2.725-2.375 1.333-.667 3.042-1 5.125-1s3.783.333 5.1 1c1.317.667 2.225 1.458 2.725 2.375.5.917.75 2.375.75 4.375h2.5c0-2.667-.417-4.875-1.25-6.625C17.583 16.125 14.4 15.25 12 15.25Z"></path>
                            </svg>
                            <div className={styles.guestInputTextArea2}>
                                <span className={styles.guestInputText}>성인 2명</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.searchBanner}>
                    <button className={styles.searchBannerBtn}>
                        <div className={styles.searchBannerTextArea}>
                            <span className={styles.searchBannerText}>검색</span>
                        </div>
                    </button>
                </div>
            </div>
      </section>

      <div className={styles.promoSection}>
        <div className="promoBanner"></div>
        <div className="eventCardList"></div>
      </div>
        
      <div className={styles}>
          {/* 추가 컨텐츠 영역 */}
        </div>
    </div>
  );
};

export default StayAbroad; 