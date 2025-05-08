import React from "react";
import styles from "./styles.module.css";

const StickyFooter = ({
  price,
  marginType,
  datePeople,
  onReserve,
  visible,
  footerMode = "fixed", // "fixed" or "stuck"
  style = {},
}) => {
  if (!visible) return null;
  const footerClass =
    footerMode === "stuck" ? styles.stickyFooterStuck : styles.stickyFooter;
  return (
    <div className={footerClass} style={style}>
      <div>
        <span className={styles.salePrice}>{price.toLocaleString()}원/박</span>
        <span className={styles.marginType}>{marginType}</span>
        <span className={styles.datePeople}>{datePeople}</span>
      </div>
      <button className={styles.reserveButton} onClick={onReserve}>
        객실 선택
      </button>
    </div>
  );
};

export default StickyFooter;
