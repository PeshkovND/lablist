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
import { shewartMapCoef } from '../../../data/shewartMapCoef';
import { useAppSelector } from '../../../hooks';
import styles from './shewhartMap.module.css'

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
    const journal = useAppSelector((state) => state.journal.journal);
    const allUsers = useAppSelector((state) => state.users.users);
    const allLabs = useAppSelector((state) => state.labs.labs);
    let S: { name: string; mean: number }[] = []
    let R: number[] = []
    let meanR: number = 0;
    let meanS: number = 0;

    if (journal?.labs) {
        const labsCount = journal.labs.length
        allUsers.forEach(elem => {
            let sum = 0;
            let min = Infinity;
            let max = 0;
            const studentName = elem.name + ' ' + elem.surname;
            allLabs.forEach(i => {
                if (elem._id === i.userId) {
                    sum += i.score
                    if (i.score > max) max = i.score
                    if (i.score < min) min = i.score
                }
            }
            );
            const mean = sum / labsCount
            S.push({
                name: studentName,
                mean: mean,
            })
            meanS += mean / journal.students.length
            if (min === Infinity) min = 0
            const r = max - min
            R.push(r)
            meanR += r / (journal.students.length)
        })


        const UCL = meanS + meanR * shewartMapCoef[labsCount].A2;
        const LCL = meanS - meanR * shewartMapCoef[labsCount].A2;
        const RLCL = shewartMapCoef[labsCount].D3 * meanR;
        const RUCL = shewartMapCoef[labsCount].D4 * meanR;
        const labels = S.map(a => a.name);

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
                {
                    label: 'Нижняя контрольная граница',
                    data: labels.map((e) => RLCL),
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