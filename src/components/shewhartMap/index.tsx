import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { shewartMapCoef } from '../../data/shewartMapCoef';
import { useAppSelector } from '../../hooks';
import styles from './shewhartMap.module.css'
import { useState } from 'react';
import { Journal, ShewartMapValues } from '../../types';

interface ModalProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const optionsS = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0
    }
  },
  animation: {
    duration: 0
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Карта среднего значения',
    },
  },
};

export const optionsR = {
  ...optionsS,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Карта размахов',
    },
  },
};

export const ShewhartMap = (props: ModalProps) => {
  const journal = useAppSelector((state) => state.journal.journal);;
  const allUsers = useAppSelector((state) => state.users.users);
  const allLabs = useAppSelector((state) => state.labs.labs);
  const [chooseButton, setChooseButton] = useState('students')

  const studentsMaps = (journal: Journal): ShewartMapValues => {
      let studentsS: number[] = []
      let labels: string[][] = []
      let studentsMeanR: number = 0;
      let studentsR: number[] = []
      let studentsMeanS: number = 0;
      const allLabsCount = journal.labs.length
      const allStudentsCount = allUsers.length
      allUsers.forEach(elem => {
        let sum = 0;

        let min = Infinity;
        let max = 0;
        let studentLabsCount = 0
        allLabs.forEach(i => {
          if (elem._id === i.userId) {
            studentLabsCount += 1
            sum += i.score
            if (i.score > max) max = i.score
            if (i.score < min) min = i.score
          }
        }
        );
        const mean = sum / allLabsCount
        studentsS.push(mean)
        labels.push([elem.name, elem.surname])
        studentsMeanS += mean / allStudentsCount
        if (min === Infinity || studentLabsCount !== allLabsCount) {
          min = 0
        }
        const r = max - min
        studentsR.push(r)
        studentsMeanR += r / (allStudentsCount)
      })

      const value: ShewartMapValues = {
        UCL: Math.min(studentsMeanS + studentsMeanR * shewartMapCoef[allLabsCount].A2, 10),
        LCL: Math.max(studentsMeanS - studentsMeanR * shewartMapCoef[allLabsCount].A2, 0),
        RLCL: Math.max(shewartMapCoef[allLabsCount].D3 * studentsMeanR, 0),
        RUCL: Math.min(shewartMapCoef[allLabsCount].D4 * studentsMeanR, 10),
        Labels: labels,
        S: studentsS,
        R: studentsR,
        meanR: studentsMeanR,
        meanS: studentsMeanS
      }

      return value
    }

    
  const labsMaps = (journal: Journal): ShewartMapValues => {
    let labsS: number[] = []
    let labels: string[][] = []
    let labsR: number[] = []
    let labsMeanR: number = 0;
    let labsMeanS: number = 0;
    const allLabsCount = journal.labs.length
    const allStudentsCount = allUsers.length
    journal.labs.forEach(elem => {
      let sum = 0;
      let min = Infinity;
      let max = 0;
      let labsCount = 0
      const labName = "№" + elem.num;
      allLabs.forEach(i => {
        if (elem.num === i.num) {
          labsCount += 1
          sum += i.score
          if (i.score > max) max = i.score
          if (i.score < min) min = i.score
        }
      }
      );
      const mean = sum / allUsers.length
      labsS.push(mean)
      labels.push([labName])
      labsMeanS += mean / allLabsCount
      if (min === Infinity || labsCount !== allStudentsCount) {
        min = 0
      }
      const r = max - min
      labsR.push(r)
      labsMeanR += r / (allLabsCount)
    })

    const value: ShewartMapValues = {
      UCL: Math.min(labsMeanS + labsMeanR * shewartMapCoef[allStudentsCount].A2, 10),
      LCL: Math.max(labsMeanS - labsMeanR * shewartMapCoef[allStudentsCount].A2, 0),
      RLCL: Math.max(shewartMapCoef[allStudentsCount].D3 * labsMeanR, 0),
      RUCL: Math.min(shewartMapCoef[allStudentsCount].D4 * labsMeanR, 10),
      Labels: labels,
      S: labsS,
      R: labsR,
      meanR: labsMeanR,
      meanS: labsMeanS
    }

    return value
  }

  if (journal) {
    let data: ShewartMapValues;
    if (chooseButton === "students") {
      data = studentsMaps(journal)
    }
    else {
      data = labsMaps(journal)
    }

    const dataS = {
      labels: data.Labels,
      datasets: [
        {
          label: 'Средний балл по группе',
          data: data.Labels.map(() => data.meanS),
          backgroundColor: 'orange',
          borderColor: 'orange',
        },
        {
          label: 'Средний балл',
          data: data.S.map((e) => e),
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'Верхняя контрольная граница',
          data: data.Labels.map(() => data.UCL),
          backgroundColor: 'green',
          borderColor: 'green',
        },
        {
          label: 'Нижняя контрольная граница',
          data: data.Labels.map(() => data.LCL),
          backgroundColor: 'red',
          borderColor: 'red',
        },
      ],
    };

    const dataR = {
      labels: data.Labels,
      datasets: [
        {
          label: 'Средний размах по группе',
          data: data.Labels.map(() => data.meanR),
          backgroundColor: 'orange',
          borderColor: 'orange',
        },
        {
          label: 'Размах баллов',
          data: data.R.map((e) => e),
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'Верхняя контрольная граница',
          data: data.Labels.map(() => data.RUCL),
          backgroundColor: 'green',
          borderColor: 'green',
        },
        {
          label: 'Нижняя контрольная граница',
          data: data.Labels.map(() => data.RLCL),
          backgroundColor: 'red',
          borderColor: 'red',
        },
      ],
    };



    return (
      <div className={styles.modal} onClick={() => props.setActive(false)}>
        <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
          <div className={styles.closeContainer}>
            <div onClick={() => props.setActive(false)} className={styles.closeClickContainer}>
              <img
                src={'/close.svg'}
                width={'100%'}
                alt='Закрыть'
              />
            </div>
          </div>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Контрольные карты</h2>
            <div className={styles.togler}>
              <div className={chooseButton === "students" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('students')}>Студенты</div>
              <div className={chooseButton === "labs" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('labs')}>Работы</div>
            </div>
            <div className={styles.graph}>
              <Line options={optionsS} data={dataS} updateMode='none' />
            </div>
            <div className={styles.graph}>
              <Line options={optionsR} data={dataR} updateMode='none' />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}