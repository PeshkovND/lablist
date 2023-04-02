import { Contact } from '../../../types'
import styles from './contactElem.module.css'

interface ContactProps {
    contact: Contact
}

export const ContactElem = (props: ContactProps) => {
    return(
        <p className={styles.contact}>{props.contact.type} - {props.contact.value}</p>
    )
}