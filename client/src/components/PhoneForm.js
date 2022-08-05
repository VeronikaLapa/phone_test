import {useState} from "react";
import REGIONS from "../regions.json";
import styles from "./PhoneForm.module.css"

function PhoneForm ({phoneSubmitAction}) {
    
    let [phoneInput, setPhoneInput] = useState("");
    let [codeSelect, setCodeSelect] = useState("+7");

    const handleSubmit = (e) => {
        phoneSubmitAction(codeSelect, phoneInput);
        setPhoneInput("");
        e.preventDefault();
    };

    const handleChange = (event) => {
        setPhoneInput(event.target.value);
    };

    const handleCodeChange = (e) => {
        setCodeSelect(e.target.value)
        console.log(e.target.key)
    }
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Телефон:
                <select onChange={handleCodeChange}>
                    {REGIONS.data.map((region) => {return <option key={region.code}>{region.code}</option>})}
                </select>
                <input
                    type="text"
                    name="phone"
                    value={phoneInput}
                    onChange={handleChange}
                />
            </label>
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default PhoneForm
