import { NavLink } from "react-router-dom"
import { Journal } from "../../types"
import styles from "./journalCard.module.css"
import { dateMaker } from "../../utils/dateMaker"

interface JournalCardProps {
  journal: Journal
}

export const JournalCard = (props: JournalCardProps) => {
  return (
    <div className={styles.journalCardContainer}>
      <div className={styles.journalName}>
        <NavLink to={`/${props.journal._id}`} >
          {props.journal.discription}
        </NavLink>
      </div>
      <p className={styles.date}>Создан {dateMaker(props.journal.dateOfCreation)}</p>
    </div>
  )
}