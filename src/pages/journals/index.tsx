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
    if (searchValue) dispatch(fetchAllJournals(searchValue))
    else dispatch(fetchAllJournals(""))
  }, [searchValue])

  useEffect(() => {
    if (searchValue) {
      setValue(searchValue)
    }
  }, [])


  const parseJournals = () => {
    if (journals.loading) { return <Loading /> }
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

  const onSearchComlite = (findValue: string) => {
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
    <div>
      <h1 className={styles.title}>Мои журналы</h1>
      <p className={styles.subtitle}>На этой странице представлены все созданные вами журналы.</p>
      <Searcher value={value} setValue={setValue} actionHandler={(value) => onSearchComlite(value)} placeHolder="Найти журнал"/>
      {parseJournals()}
    </div>
  )
}