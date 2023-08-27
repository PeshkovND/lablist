import styles from "./searcher.module.css";

interface SearcherProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  actionHandler: (value: string) => void;
  placeHolder?: string
}

export const Searcher = (props: SearcherProps) => {

  return (
    <form className={styles.searcher} onSubmit={e => {
      e.preventDefault()
      props.actionHandler(props.value)
    }}>
      <input type="search" className={styles.searchField} value={props.value} onChange={e => props.setValue(e.target.value)} placeholder={props.placeHolder ?? ""}/>
      <button className={styles.searchButton} type="submit">
        <img src="/search.svg" alt="" className={styles.searchIcon} />
      </button>
    </form>
  );
};
