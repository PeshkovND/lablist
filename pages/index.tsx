import { Diapozon } from "../components/diapozon";
import { Header } from "../components/header";
import { Profile } from "../components/profile";
import { Searcher } from "../components/searcher";
import { Table } from "../components/table";
import styles from "../styles/main.module.css";

const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
      <div>
        <div className={styles.over}>
          <div style={{ marginLeft: "20px" }}>
            <Searcher />
            <Diapozon />
          </div>
          <Profile />
        </div>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
