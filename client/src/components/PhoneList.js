import {useSelector} from "react-redux";
import {selectList} from "../store";

export default function PhoneList() {
    const phoneList = useSelector(selectList);
    return (
        <ol>
            {phoneList.map((phone) => {
                return (
                    <li key={phone.id}>
                        {phone.code} {phone.number}
                    </li>
                );
            })}
        </ol>
    );
}
