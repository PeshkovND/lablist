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
import { useAppSelector } from '../../../hooks';
import styles from './shewhartMap.module.css'

interface ModalProps {
    active: boolean;
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

export const options = {
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
            text: 'Карта индивидуальных значений',
        },
    },
};
export const ShewhartMap = (props: ModalProps) => {
    const journal = useAppSelector((state) => state.journal.journal);
    const allUsers = useAppSelector((state) => state.users.users);
    const allLabs = useAppSelector((state) => state.labs.labs);
    let S: { name: string; mean: number }[] = []
    let R: number[] = [0]
    let meanR: number = 0;
    let meanS: number = 0;

    if (journal?.labs) {
        let lastElem: number;
        allUsers.forEach(elem => {
            let sum = 0;
            const studentName = elem.name + ' ' + elem.surname;
            const studentLabs = allLabs.filter(i => elem._id === i.userId);
            studentLabs.forEach(elem => {
                sum += elem.score
            })
            const mean = sum / journal.labs.length
            S.push({
                name: studentName,
                mean: mean,
            })
            meanS += mean / journal.students.length
            if (lastElem !== undefined) {
                const r = Math.abs(mean - lastElem)
                R.push(r)
                meanR += r / (journal.students.length - 1)
            }
            lastElem = mean;
        })
    }

    const UCL = meanS + meanR * 2.66;
    const LCL = meanS - meanR * 2.66;
    const RUCL = 3.267 * meanR;
    const labels = S.map(a => a.name);
    console.log(R)

    const dataS = {
        labels,
        datasets: [
            {
                label: 'Средний балл по группе',
                data: labels.map(() => meanS),
                backgroundColor: 'orange',
                borderColor: 'orange',
            },
            {
                label: 'Средний балл',
                data: S.map((e) => e.mean),
                backgroundColor: 'rgb(53, 162, 235)',
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Верхняя контрольная граница',
                data: labels.map(() => UCL),
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: 'Нижняя контрольная граница',
                data: labels.map(() => LCL),
                backgroundColor: 'red',
                borderColor: 'red',
            },
        ],
    };

    const dataR = {
        labels,
        datasets: [
            {
                label: 'Средний размах по группе',
                data: labels.map(() => meanR),
                backgroundColor: 'orange',
                borderColor: 'orange',
            },
            {
                label: 'Размах баллов',
                data: R.map((e) => e),
                backgroundColor: 'rgb(53, 162, 235)',
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Верхняя контрольная граница',
                data: labels.map((e) => RUCL),
                backgroundColor: 'green',
                borderColor: 'green',
            },
        ],
    };

    return (
        <div className={props.active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => props.setActive(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2 className={styles.title}>Контрольные карты</h2>
                <div className={styles.graphContainer}>
                    <div className={styles.graph}>
                        <Line options={options} data={dataS} updateMode='none' />
                    </div>
                    <div className={styles.graph}>
                        <Line options={options} data={dataR} updateMode='none' />
                    </div>
                </div>
            </div>
        </div>
    )
}