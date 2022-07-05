import styles from "../../../../styles/table.module.css";
import { DoneLab } from "../../../../types";

interface TableHeaderProps {
  lab: DoneLab;
}

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <th>
      <div className={styles.header}>{"№ " + props.lab.labId}</div>
    </th>
  );
};
