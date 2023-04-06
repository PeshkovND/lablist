import styles from "./table.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { dropJournal, fetchJournal } from "../../store/journalSlice";
import { dropUsers, fetchUsers } from "../../store/userSlice";
import { dropMessages, fetchHistory, fetchMessages } from "../../store/historySlice";
import { dropLabs, fetchLabs } from "../../store/labSlice";
import { Loading } from "../../components/loading";
import { TableHeader } from "../../components/tableHeader";
import { TableContent } from "../../components/tableContent";
import { History } from "../../components/history";
import { useParams } from "react-router-dom";
import { dropFilters } from "../../store/filterStore";

export const Table = () => {
  const { id } = useParams();

  const [step, setStep] = useState(0)
  
  const journal = useAppSelector((state) => state.journal.journal);
  const JournalLoading = useAppSelector((state) => state.journal.loading);
  const UsersLoading = useAppSelector((state) => state.users.loading);
  const LabsLoading = useAppSelector((state) => state.labs.loading);
  const HistoryLoading = useAppSelector((state) => state.history.loading);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
    dispatch(fetchJournal(id))
    dispatch(fetchUsers(id))
    dispatch(fetchLabs(id))
    dispatch(fetchHistory(id))
    dispatch(fetchMessages(id))
    }
    return () => {
      console.log("dropped")
      dispatch(dropFilters())
      dispatch(dropJournal())
      dispatch(dropMessages())
      dispatch(dropLabs())
      dispatch(dropUsers())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = JournalLoading || UsersLoading || LabsLoading || HistoryLoading;

  const drawTable = () => {
    if (loading) { return <Loading /> }
    if (journal) {

      return (<div className={styles.table}>
        <TableHeader step={step} setStep={setStep}/>
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
