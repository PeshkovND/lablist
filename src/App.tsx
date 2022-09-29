import React from 'react';
import { Diapozon } from "./components/diapozon";
import { Header } from "./components/header";
import { Profile } from "./components/profile";
import { Searcher } from "./components/searcher";
import { Table } from "./components/table";
import styles from "./styles/main.module.css";

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <div style={{ height: "100vh", width: "100%" }}>
        <div className={styles.over}>
          <div
            style={{
              marginLeft: "1.3vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Searcher />
            <Diapozon />
          </div>
          <Profile />
        </div>
        <Table />
      </div>
    </div>
  );
}

export default App;
