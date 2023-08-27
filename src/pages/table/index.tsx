import styles from "./table.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { dropJournal, fetchJournal } from "../../store/journalSlice";
import { dropUsers, fetchUsers } from "../../store/userSlice";
import { dropMessages, fetchHistory } from "../../store/historySlice";
import { dropLabs, fetchLabs } from "../../store/labSlice";
import { Loading } from "../../components/loading";
import { TableHeader } from "../../components/tableHeader";
import { TableContent } from "../../components/tableContent";
import { History } from "../../components/history";
import { useParams } from "react-router-dom";
import { dropFilters } from "../../store/filterStore";
import { fetchMessages } from "../../store/messagesSlice";

export const Table = () => {
  const { id } = useParams();

  const [step, setStep] = useState(0)

  const journal = useAppSelector((state) => state.journal);
  const JournalLoading = useAppSelector((state) => state.journal.loading);
  const UsersLoading = useAppSelector((state) => state.users.loading);
  const UsersError = useAppSelector((state) => state.users.error);
  const LabsLoading = useAppSelector((state) => state.labs.loading);
  const LabsError = useAppSelector((state) => state.labs.error);
  const HistoryLoading = useAppSelector((state) => state.history.loading);
  const MessagesLoading = useAppSelector((state) => state.messages.loading);
  const HistoryError = useAppSelector((state) => state.history.error);
  const MessagesError = useAppSelector((state) => state.messages.error);
  const dispatch = useAppDispatch()

  const fetchAll = (id: string)=> {
    dispatch(fetchJournal(id))
    dispatch(fetchUsers(id))
    dispatch(fetchLabs(id))
    dispatch(fetchHistory(id))
    dispatch(fetchMessages(id))
  }

  useEffect(() => {
    if (id) {
      fetchAll(id)
    }
    return () => {
      dispatch(dropFilters())
      dispatch(dropJournal())
      dispatch(dropMessages())
      dispatch(dropLabs())
      dispatch(dropUsers())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = JournalLoading || UsersLoading || LabsLoading || HistoryLoading || MessagesLoading;

  const drawTable = () => {
    if (loading) { return <Loading /> }
    if (journal.error || UsersError || LabsError || HistoryError || MessagesError) {
      return <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Ошибка загрузки данных</p>
        <button className={styles.errorButton} onClick={() => fetchAll(id as string)}>Повторить</button>
      </div>
    }
    if (journal.journal) {

      return (<div className={styles.table}>
        <TableHeader step={step} setStep={setStep} />
        <TableContent step={step} />
        <History />
      </div>)
    }
  }
  return (
    <div className={styles.tableContainer}>
      {drawTable()}
    </div>
  );
}
