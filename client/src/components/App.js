import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.css";
import { useEffect, useState } from "react";
import PhoneForm from "./PhoneForm";
import axios from "axios"


let initClient = new W3CWebSocket("ws://127.0.0.1:8000");

function App() {
    let [phoneList, setPhoneList] = useState([]);
    let [connected, setConnected] = useState(true);
    let [client, setClient] = useState(initClient);

    useEffect(() => {
        axios.get("http://localhost:7000/phones")
        .then(res => {
            const phoneHistory = res.data;
            setPhoneList(phoneHistory);
        })
    }, []);

    useEffect(() => {
        console.log("Use effect")
        client.onopen = () => {
            console.log("Connection open")
            setConnected(true);
        };


        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setPhoneList((p) => [dataFromServer, ...p]);
        };

        client.onclose = () => {
            console.log("Connection close")
            //setConnected(false);
        }
        client.onerror = () => {
            console.log("Connection error")
            setTimeout(function() {
                console.log("Set client");
                setClient(new W3CWebSocket("ws://127.0.0.1:8000"));
            }, 10000);
        }
    }, [client]);
    const phoneSubmitAction = (data) => {
        client.send(JSON.stringify(data))
    }
    return (
        <div className="App">
            {connected ? (
                <>
                    <PhoneForm phoneSubmitAction={phoneSubmitAction} />
                    <ol>
                        {phoneList.map((phone) => {
                            return <li key={phone.id}>{phone.code} {phone.number}</li>;
                        })}
                    </ol>
                </>
            ) : (
                <div>No connection</div>
            )}
        </div>
    );
}

export default App;
