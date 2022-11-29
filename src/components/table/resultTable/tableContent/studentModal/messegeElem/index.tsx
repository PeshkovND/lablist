import { Message, User } from "../../../../../../types"
import styles from './messageElem.module.css'

interface MessageProps {
    message: Message;
    student: User | null;
}

interface arrow {
    rotate: number;
    grayscale: number;
    style: string;
}

export const MessageElem = (props: MessageProps) => {

    const checkArrow = (message: Message, student: User | null): arrow => {
        if (student) {
            if (String(message.to) === student._id)
                return { rotate: 180, grayscale: 100, style: styles.send }
            else return { rotate: 0, grayscale: 0, style: '' }
        }
        return { rotate: 0, grayscale: 0, style: '' }
    }

    const arrow = checkArrow(props.message, props.student)

    return (
        <div className={styles.messegeElemContainer}>
            <div className={arrow.style}>
                <div className={styles.flexContainer}>
                    <div className={styles.arrowContainer}>
                        <img src={'/arrow.svg'} width={'100%'} style={{ transform: `rotate(${arrow.rotate}deg)`, filter: `grayscale(${arrow.grayscale}%) opacity(100%)` }} alt='' />
                    </div>
                    <div>
                        <p className={styles.message + ' ' + styles.theme}>{props.message.theme}</p>
                        <p className={styles.message + ' ' + styles.content}>{props.message.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}