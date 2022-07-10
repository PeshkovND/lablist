import styles from "../../../../../styles/studentCard.module.css";
import Image from "next/image";
import { Student, DoneLab } from "../../../../../types";

interface HistoryElemProps {
  elem: Student;
}

export const StudentCard = (props: HistoryElemProps) => {

  const checkPhoto = (elem: string | null) =>{
    if (elem) {
      return elem
    }
    else {
      return '/unk.png'
    }
  }

  const checkAttention = (array: DoneLab[]) =>{
    const res = array.filter(elem => elem.status === 1)
    if (res.length != 0){
      return <Image src="/attention.png" alt="" width={"100%"} height={"100%"} />
    }

    else {
      return
    }
  }

  return (
    <div className={styles.studentCard}>
      <div className={styles.studentProfileContainer}>
        <Image
          src={checkPhoto(props.elem.photo)}
          alt=""
          width={"100%"}
          height={"100%"}
          className={styles.studentPic}
        />
      </div>
      <div className={styles.studentNameContainer}>
        <div className={styles.attentionContainer}>
          <div></div>
          <div className={styles.attentionPic}>
            {checkAttention(props.elem.done)}
          </div>
        </div>
        <div>
            <p className={styles.name}>{props.elem.surname}</p>
            <p className={styles.name}>{props.elem.name}</p>
        </div>
      </div>
    </div>
  );
};
