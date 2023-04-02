import { Header } from "./components/header";
import { Profile } from "./components/profile";
import { Searcher } from "./components/searcher";
import styles from "./App.module.css";
import { appSockets, WebsocketProvider } from './contexts/WebSocketContext';
import { Table } from "./pages/table";

function App() {
  return (
    <WebsocketProvider value={appSockets}>
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>
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
