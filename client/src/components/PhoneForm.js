import REGIONS from "../regions.json";
import styles from "./PhoneForm.module.css";
import { useForm } from "react-hook-form";
import {useEffect} from "react";

function PhoneForm({ phoneSubmitAction }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues: { code: "+7", number: "" }, mode: "all" });

    useEffect(() => {
        reset();
    },[reset])

    const onSubmit = (data) => {
        phoneSubmitAction(data).then((res) => {
            reset();
        });
    };
    const showError = (errors) => {
        if (errors.number) {
            if (errors.number.type === "required") {
                return <span role="alert">Number is required</span>;
            }
            if (errors.number.type === "minLength") {
                return (
                    <span role="alert">
                        Number should contains at least 3 digits
                    </span>
                );
            }
            if (errors.number.type === "maxLength") {
                return (
                    <span role="alert">
                        Number can not be longer than 10 digits
                    </span>
                );
            }
            if (errors.number.type === "pattern") {
                return (
                    <span role="alert">
                        Wrong format. Only digits are available
                    </span>
                );
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {errors.number &&
                <div className={styles.error}>
                    {showError(errors)}
                </div>
            }
            <label>Phone number:</label>
            <div>
                <select {...register("code", { required: true })}>
                    {REGIONS.data.map((region) => {
                        return (
                            <option key={`${region.code}`} value={region.code}>
                                {`${region.region} ${region.code}`}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="tel"
                    placeholder="Number"
                    {...register("number", {
                        required: true,
                        pattern: /^\d+$/,
                        minLength: 3,
                        maxLength: 10,
                    })}
                    aria-invalid={errors.number ? "true" : "false"}
                />
            </div>
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default PhoneForm;
