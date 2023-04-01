import React, { useEffect } from 'react';
import { Header } from "./components/header";
import { Profile } from "./components/profile";
import { Searcher } from "./components/searcher";
import { Table } from "./components/table";
import styles from "./App.module.css";
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchJournal } from './store/journalSlice';
import { fetchUsers } from './store/userSlice';
import { fetchLabs } from './store/labSlice';
import { fetchHistory, fetchMessages } from './store/historySlice';
import { appSockets, WebsocketProvider } from './contexts/WebSocketContext';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchJournal())
    dispatch(fetchUsers())
    dispatch(fetchLabs())
    dispatch(fetchHistory())
    dispatch(fetchMessages())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WebsocketProvider value={appSockets}>
    <div className={styles.main}>
      <Header />
      <div style={{ height: "100vh", width: "100%" }}>
        <div className={styles.over}>
          <Searcher />
          <Profile />
        </div>
        <Table />
      </div>
    </div>
    </WebsocketProvider>
  );
}

export default App;
