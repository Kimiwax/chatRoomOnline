const API_BASE_URL = "http://localhost:2000";
import {rtdb} from "./rtdb";
import map from "lodash/map";

const state = {
    data: {
        fullName: "",
        email: "",
        userId: "",
        roomId: "",
        messages: [],
        rtbRoomId: ""
    },
    listeners: [],
    init() {
        const lastStorageState = localStorage.getItem("state");
    },
    listenRoom() {
        const cs = this.getState();
        const chatRoomsRef = rtdb.ref("/rooms/" + cs.rtbRoomId);

        chatRoomsRef.on("value", snapshot => {
            const currentState = this.getState();
            const messagesFromServer = snapshot.val();
            console.log(messagesFromServer);

            const messagesList = map(messagesFromServer.messages);
            currentState.messages = messagesList;
            this.setState(currentState);
        });
    },
    setEmailAndName(email : string, fullName : string) {
        const currentState = this.getState();
        currentState.fullName = fullName;
        currentState.email = email;
        this.setState(currentState);
    },
    setRoomId(roomId : string) {
        const currentState = this.getState();
        currentState.roomId = roomId;
        this.setState(currentState);
    },
    getState() {
        return this.data;
    },
    signIn(callback) {
        const cs = this.getState();
        if (cs.email) {
            fetch(API_BASE_URL + "/auth", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {email: cs.email, fullname: cs.fullName}
                )
            }).then(res => {
                return res.json();
            }).then(data => {
                cs.userId = data.id;
                // console.log(data);
                this.setState(cs);
                callback();
            });
        } else {
            console.error("No hay un email en el state");
            callback(true);
        }
    },
    signUp(callback) {
        const cs = this.getState();
        if (cs.email) {
            fetch(API_BASE_URL + "/signup", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {email: cs.email, nombre: cs.fullName}
                )
            }).then(res => {
                return res.json();
            }).then(data => {
                cs.userId = data.id;
                console.log(data);
                this.setState(cs);
                callback();
            });
        } else {
            console.error("No hay un email en el state");
            callback(true);
        }
    },
    askNewRoom(callback ?) {
        const cs = this.getState();
        if (cs.userId) {
            fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {userId: cs.userId}
                )
            }).then(res => {
                return res.json();
            }).then(data => {
                cs.roomId = data.id;
                this.setState(cs);
                if (callback) {
                    callback();
                }
            });
        } else {
            console.log("no hay userId");
        }
    },
    accesToRoom(callback ?) {
        const cs = this.getState();
        const roomId = cs.roomId;
        console.log(roomId + " Soy accesroom");

        fetch(API_BASE_URL + "/room/" + roomId + "?userId=" + cs.userId, {}).then(res => {
            return res.json();
        }).then(data => {
            cs.rtbRoomId = data.rtdbRoomId;
            console.log(data + "log");

            this.setState(cs);
            this.listenRoom();
            if (callback) 
                callback();
            
        });
    },
    setName(pName) {
        const currentState = this.getState();
        currentState.nombre = pName;
        this.setState(currentState);
    },
    pushMessage(message
    : string) {
        const nombreDelState = this.data.fullName;
        const roomIDlargo = this.data.rtbRoomId;
        console.log(nombreDelState, message, roomIDlargo);

        fetch(API_BASE_URL + "/messages", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {from: nombreDelState, messages: message, roomId: roomIDlargo}
            )
        });
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("state", JSON.stringify(newState));
        console.log("Soy el state, he cambiado", this.data);
    },
    subscribe(callback
    : (any) => any) {
        this.listeners.push(callback);
    }
};

export {
    state
};
