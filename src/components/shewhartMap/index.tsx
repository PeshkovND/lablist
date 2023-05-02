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
import { Modal } from '../modal';

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
      text: 'Карта средних значений',
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
      allLabs.forEach(lab => {
        if (elem._id === lab.userId && lab.isActual) {
          studentLabsCount += 1
          sum += lab.score
          if (lab.score > max) max = lab.score
          if (lab.score < min) min = lab.score
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
    let labsS: number[] = []; 
    let labels: string[][] = [];
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
      allLabs.forEach(lab => {
        if (elem.num === lab.num && lab.isActual) {
          labsCount += 1
          sum += lab.score
          if (lab.score > max) max = lab.score
          if (lab.score < min) min = lab.score
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

  const labsDeadlinesMaps = (journal: Journal): ShewartMapValues => {
    const moment = require('moment')
    const currentDate = new Date().toISOString()
    let deadlineLabsS: number[] = [];
    let deadlineLabels: string[][] = [];
    let deadlineLabsR: number[] = []
    let deadlineLabsMeanR: number = 0;
    let deadlineLabsMeanS: number = 0;
    const allLabsCount = journal.labs.length
    const allStudentsCount = allUsers.length
    journal.labs.forEach(elem => {
      if (elem.deadline && elem.deadline < currentDate) {
        let labsCount = 0
        let deadlineSum = 0;
        let deadlineMin = Infinity;
        let deadlineMax = 0;
        const labName = "№" + elem.num;
        const x = new moment(elem.deadline)
        allLabs.forEach(lab => {
          if (elem.num === lab.num && lab.isActual) {
            labsCount += 1
            const y = new moment(lab.dateOfCreation)
            const diff = y.diff(x, 'days')
            deadlineSum += diff
            if (diff > deadlineMax) deadlineMax = diff
            if (diff < deadlineMin) deadlineMin = diff
          }
        }
        );
        const y = new moment(currentDate)
        const diff = y.diff(x, 'days')
        deadlineSum += (allStudentsCount - labsCount) * diff
        if (diff > deadlineMax) deadlineMax = diff
        if (diff < deadlineMin) deadlineMin = diff
        const deadlineMean = deadlineSum / allUsers.length
        deadlineLabsS.push(deadlineMean)
        deadlineLabels.push([labName])
        deadlineLabsMeanS += deadlineMean / allLabsCount
        if (deadlineMin === Infinity) {
          deadlineMin = 0
        }
        const r = deadlineMax - deadlineMin
        deadlineLabsR.push(r)
        deadlineLabsMeanR += r / (allLabsCount)

      }
    })

    const deadlineValue: ShewartMapValues = {
      UCL: deadlineLabsMeanS + deadlineLabsMeanR * shewartMapCoef[allStudentsCount].A2,
      LCL: deadlineLabsMeanS - deadlineLabsMeanR * shewartMapCoef[allStudentsCount].A2,
      RLCL: shewartMapCoef[allStudentsCount].D3 * deadlineLabsMeanR,
      RUCL: shewartMapCoef[allStudentsCount].D4 * deadlineLabsMeanR,
      Labels: deadlineLabels,
      S: deadlineLabsS,
      R: deadlineLabsR,
      meanR: deadlineLabsMeanR,
      meanS: deadlineLabsMeanS
    }

    return deadlineValue
  }


  if (journal) {
    let data: ShewartMapValues;
    let meanLabel = "Средний балл по группе"
    let valuesLabel = 'Средний балл';
    let rangeLabel = 'Размах баллов'
    switch (chooseButton) {
      case "students":
        data = studentsMaps(journal)
        break
      case "labs":
        data = labsMaps(journal)
        break
      default:
        data = labsDeadlinesMaps(journal)
        meanLabel = "Средняя разница по группе"
        valuesLabel = 'Среднее смещение срока сдачи работы';
        rangeLabel = 'Размах разницы'
    }

    const dataS = {
      labels: data.Labels,
      datasets: [
        {
          label: valuesLabel,
          data: data.S.map((e) => e),
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgb(53, 162, 235)',
        },
        {
          label: meanLabel,
          data: data.Labels.map(() => data.meanS),
          backgroundColor: 'orange',
          borderColor: 'orange',
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
          label: rangeLabel,
          data: data.R.map((e) => e),
          backgroundColor: 'rgb(53, 162, 235)',
          borderColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'Средний размах по группе',
          data: data.Labels.map(() => data.meanR),
          backgroundColor: 'orange',
          borderColor: 'orange',
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
      <Modal setModal={() => props.setActive(false)} width={"90vw"}>
        <h2 className={styles.title}>Контрольные карты</h2>
        <div className={styles.togler}>
          <div className={chooseButton === "students" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('students')}>Средние баллы студентов</div>
          <div className={chooseButton === "labs" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('labs')}>Средние баллы работ</div>
          <div className={chooseButton === "deadlines" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('deadlines')}> Средние смещения сроков сдачи работ</div>
        </div>
        <div className={styles.graph}>
          <Line options={optionsS} data={dataS} updateMode='none' />
        </div>
        <div className={styles.graph}>
          <Line options={optionsR} data={dataR} updateMode='none' />
        </div>
      </Modal>
    )
  }
  return null
}