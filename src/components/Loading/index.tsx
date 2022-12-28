import React, { ReactElement } from 'react';
import styles from './loading.module.css';

export const Loading = (): ReactElement => {
  return <div className={styles.loaderContainer}><div className={styles.loader}/></div>;
};
