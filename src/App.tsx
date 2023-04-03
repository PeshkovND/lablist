import { Header } from "./components/header";
import { Profile } from "./components/profile";
import { Searcher } from "./components/searcher";
import styles from "./App.module.css";
import { appSockets, WebsocketProvider } from './contexts/WebSocketContext';

import { RouteObject, useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const routing: RouteObject[] = routes;
  const element = useRoutes(routing);

  return (
    <WebsocketProvider value={appSockets}>
      <div className={styles.main}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div className={styles.content}>
          <div className={styles.over}>
            <Profile />
          </div>
          {element}
        </div>
      </div>
    </WebsocketProvider>
  );
}

export default App;
