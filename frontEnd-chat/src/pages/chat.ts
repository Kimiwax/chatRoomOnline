import {Router} from "@vaadin/router";
import {state} from "../state";


type Message = {
    from: string;
    message: string;
};


class ChatPage extends HTMLElement {
    connectedCallback() {
        state.subscribe(() => {
            console.log("hola");
            
            const currentState = state.getState();
            this.messages = currentState.messages;
            this.roomId = currentState.roomId;
            this.render();
        })
        this.render();

    }
    messages : Message[] = [];
    roomId : number;
    
    addListeners() {
        const form = this.querySelector(".submit-message");
        form ?. addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target as any;
            state.pushMessage(target["new-message"].value);

        });
    }
    scrollToBottom() {
        const mensaje = this.querySelector(".messages")as HTMLElement;
        mensaje.scrollTop = mensaje.scrollHeight;
    }

    render() {
        const style = document.createElement("style");


        this.innerHTML = ` 
        <main class="container-fluid d-flex flex-column align-items-center pb-5 mainForm w-100">
        <section class="mainForm-section mb-5 col-12 col-sm-6 col-xxl-5">
            <h1 class="text-center">Kimi Chat</h1>
            <h4>Room ID:"${this.roomId}"</h4>
            <div class="container-fluid">
                <div class="container-window">
                    <div class="messages d-flex flex-column justify-content-end align-items-end mb-3">
                    ${
            this.messages.map((m) => {
                return `
                        <div class="container-messages">
                            <div class="message" mFrom="${
                    m.from
                }">${
                    m.from
                }:</div>
                            <div class="message_p">${
                    m.message
                }</div>
                        </div>
                        `
            }).join("")
        }
                    </div>
                    <form class="submit-message">
                        <input type="text" class="form-control" id="exampleInputEmail1" name="new-message" required>
                        <button class="btn btn-outline-success w-100 mt-3">Enviar</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
        `;

        style.innerHTML = `
        *{
            background-color:#1D2033;
            color:#FFFF;
            font-family: 'Poppins', sans-serif;
        }
        .messages{
            height: 500px;
            overflow-y: auto;
            border:solid 1px #343647;
            padding: 1rem;
        }

        .message{
            font-weight: 700;
        }

        .msg-sent{
            color:green;
        }

        .msg-received{
            color:red;
        }

        .container-sent.container-messages {
            border: solid 1px green;
        }

        .container-messages.container-received{
            border: solid 1px red;
        }

        .container-messages{
            width:300px;
            border: solid 1px #343647;
            padding:10px;
            margin:10px;
            border-radius: 15px;
        }

        .form-control:focus {
            border-color: #FF0000;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
          }
        `;
        this.appendChild(style);
        this.addListeners();
        this.scrollToBottom();

        const currentState = state.getState();
        const msg = this.querySelectorAll(".message");

        const currentUser = currentState.nombre;
        console.log("hola soy el chupapijas", msg);

        msg.forEach((m) => {
            const who = m.getAttribute("mFrom");


            if (who == currentUser) {
                m.classList.add("msg-sent")
                this.querySelector(".container-messages") ?. classList.add("container-sent");
            } else if (who !== currentUser) {
                m.classList.add("msg-received")
                this.querySelector(".container-messages") ?. classList.add("container-received");
            }
        })

    }
}
customElements.define("chat-p", ChatPage);
