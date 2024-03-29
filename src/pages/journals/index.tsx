import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchAllJournals } from "../../store/allJournalSlice"
import { Loading } from "../../components/loading"
import styles from "./journals.module.css"
import { JournalCard } from "../../components/journalCard"
import { Searcher } from "../../components/searcher"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

export const Journals = () => {
  const dispatch = useAppDispatch()
  const journals = useAppSelector(state => state.allJournals)
  const [value, setValue] = useState("")
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('value');

  useEffect(() => {
    dispatch(fetchAllJournals(searchValue ?? ""))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    if (searchValue) {
      setValue(searchValue)
    }
    else setValue("")
  }, [searchValue])


  const parseJournals = () => {
    if (journals.loading) { return <Loading /> }
    if (journals.error) {
      return <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Ошибка загрузки данных</p>
        <button className={styles.errorButton} onClick={() => dispatch(fetchAllJournals(searchValue ?? ""))}>Повторить</button>
      </div>
    }
    if (journals.journals) {
      if (journals.journals.length === 0) {
        return (
          <div className={styles.notFound}>Журналы не найдены</div>
        )
      }
      return journals.journals.map(elem => {
        return (
          <JournalCard journal={elem} key={elem._id} />
        )
      })
    }
  }

  const onSearchComplite = (findValue: string) => {
    if (findValue)
      navigation({
        pathname: '/',
        search: `?${createSearchParams({ value: findValue })}`
      });
    else
      navigation({
        pathname: '/'
      });
  }

  return (
    <div className={styles.journalsContainer}>
      <h1 className={styles.title}>Мои журналы</h1>
      <p className={styles.subtitle}>На этой странице представлены все созданные вами журналы.</p>
      <Searcher value={value} setValue={setValue} actionHandler={(value) => onSearchComplite(value)} placeHolder="Найти журнал"/>
      {parseJournals()}
    </div>
  )
}