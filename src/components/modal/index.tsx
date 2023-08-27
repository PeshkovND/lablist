import { ReactElement } from "react";
import styles from "./modal.module.css";

interface ModalProps {
    setModal: () => void;
    children: ReactElement[] | ReactElement;
    width: string
}

export const Modal = (props: ModalProps) => {

    return <div className={styles.modal} onClick={() => props.setModal()}>
        <div className={styles.modalWindow} style={{width: props.width}}>
                <div className={styles.closeContainer}>
                    <div onClick={() => props.setModal(

                    )} className={styles.closeClickContainer}>
                        <img
                            src={'/close.svg'}
                            width={'100%'}
                            alt='Закрыть'
                        />
                    </div>
                </div>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    </div>;
};