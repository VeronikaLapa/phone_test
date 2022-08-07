import {useSelector} from "react-redux";
import {selectList} from "../store";
import styles from "./PhoneList.module.css";

export default function PhoneList() {
    const phoneList = useSelector(selectList);
    return (
        <div className={styles.container}>
            <span className={styles.list_header}>Entered phone numbers:</span>
            <ul className={styles.list}>
                {phoneList.map((phone) => {
                    return (
                        <li key={phone.id} className={styles.list_item}>
                            {phone.code} {phone.number}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
