import { useTimes } from "@/hooks/useTime";
import styles from "../index.module.scss";
const DataHeaderTime = () => {
  const { time } = useTimes();

  return <span className={styles["header-time"]}>当前时间：{time}</span>;
};

export default DataHeaderTime;
