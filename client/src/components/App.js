import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import PhoneForm from "./PhoneForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ACTION_TYPES } from "../store";
import PhoneList from "./PhoneList";

let initClient = new W3CWebSocket(
    `ws://${process.env.REACT_APP_WS_HOST}:${process.env.REACT_APP_WS_PORT}`
);

function App() {
    let [connected, setConnected] = useState(true);
    let [client, setClient] = useState(initClient);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(
                `http://${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}/phones`
            )
            .then((res) => {
                const phoneHistory = res.data;
                dispatch({ type: ACTION_TYPES.setList, payload: phoneHistory });
            });
    }, [dispatch]);

    useEffect(() => {
        console.log("Use effect");
        client.onopen = () => {
            console.log("Connection open");
            setConnected(true);
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            dispatch({ type: ACTION_TYPES.addPhone, payload: dataFromServer });
            //setPhoneList((p) => [dataFromServer, ...p]);
        };

        client.onclose = () => {
            console.log("Connection close");
            setTimeout(function () {
                console.log("Set client");
                setClient(
                    new W3CWebSocket(
                        `ws://${process.env.REACT_APP_WS_HOST}:${process.env.REACT_APP_WS_PORT}`
                    )
                );
            }, 10000);
        };
        client.onerror = () => {
            console.log("Connection error");
        };
    }, [client, dispatch]);
    const phoneSubmitAction = useCallback((data) => {
        return axios
            .post(
                "http://localhost:7000/phones",
                {
                    code: data.code,
                    number: data.number,
                },
                { dataType: "json" }
            );
    }, []);
    return (
        <div className="App">
            {connected ? (
                <>
                    <PhoneForm phoneSubmitAction={phoneSubmitAction} />
                    <PhoneList />
                </>
            ) : (
                <div>No connection</div>
            )}
        </div>
    );
}

export default App;
