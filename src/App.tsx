import React, { useEffect } from 'react';
import { Header } from "./components/header";
import { Profile } from "./components/profile";
import { Searcher } from "./components/searcher";
import { Table } from "./components/table";
import styles from "./App.module.css";
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchJournal } from './store/journalSlice';
import { fetchUsers } from './store/userSlice';
import { fetchLabs, updateLabs } from './store/labSlice';
import { fetchHistory, fetchMessages, updateHistory, updateMessages } from './store/historySlice';

function App() {
  const labLastOrder = useAppSelector((state) => state.labs.lastOrder);
  const historyData = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchJournal())
    dispatch(fetchUsers())
    dispatch(fetchLabs())
    dispatch(fetchHistory())
    dispatch(fetchMessages())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateHistory(historyData.historyLastOrder))
      dispatch(updateMessages(historyData.messagesLastOrder))
    }, 120000)

    return () => {
      clearInterval(interval);
    };
  }, [historyData.historyLastOrder, historyData.messagesLastOrder])

  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(updateLabs(labLastOrder))
    }, 120000)
    return () => {
      clearInterval(interval);
    };
  }, [labLastOrder])

  return (
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
  );
}

export default App;
