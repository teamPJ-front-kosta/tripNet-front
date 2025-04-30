import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>tripNet</h3>
            <p className={styles.footerText}>
              여행을 더 쉽고 편리하게 만드는 서비스
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>개발자</h3>
            <ul className={styles.developerList}>
              <li className={styles.developer}>Yoonbeen Jo</li>
              <li className={styles.developer}>Byungku Lee</li>
              <li className={styles.developer}>Hwansung Hwang</li>
              <li className={styles.developer}>Hyeeun Lee</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact</h3>
            <p className={styles.contactText}>Email: team@tripnet.com</p>
            <p className={styles.contactText}>Tel: 070-1234-5678</p>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© 2024 KOSTA 프로젝트. All rights reserved.</p>
          <p>이 사이트는 학습 목적으로 제작되었습니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
