import Search from "./jsx/search.jsx";
import Suggestion from "./jsx/suggestion.jsx";
import styles from "./css/styles.module.css";

const DomesticAccommodation = () => {
  return (
    <>
      <div className={styles.mainClass}>
        <h1 className={styles.pageTitle}>국내 숙소</h1>
        <Search/>
        <Suggestion/>
      </div>
    </>
  );
};

export default DomesticAccommodation;