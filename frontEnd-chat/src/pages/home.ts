import {Router} from "@vaadin/router";
import {state} from "../state";

class Home extends HTMLElement{
    connectedCallback(){
        this.render()

        const listRooms = this.querySelector(".form-select") as HTMLInputElement;
        const roomId = this.querySelector(".roomIdDiv") as HTMLInputElement;
        const roomIdInp = this.querySelector(".roomIdInp") as HTMLInputElement;
        const input = this.querySelector('input[type="email"]') as HTMLInputElement;
        const form = this.querySelector("form") as HTMLElement;

        console.log(roomIdInp);
        
        listRooms.addEventListener('change', ()=>{
            listRooms.value == "existingRoom" ? (roomId.style.display = "block", roomIdInp.disabled = false ): (roomId.style.display = "none", roomIdInp.disabled = true )
            console.log(roomIdInp);
        })

        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            console.log(input.value);
            
        })

       /* form.addEventListener("submit", (e) =>{
            e.preventDefault();
            const target = e.target as any;
            console.log(target.nombre.value);

            state.setName(target.nombre.value);
            Router.go("/chat");
        });*/
    }
    render(){
        const style = document.createElement("style");
        this.innerHTML = `
        <main class="container-fluid d-flex flex-column align-items-center pb-5 mainForm w-100">
    <section class="mainForm-section mb-5 col-12 col-sm-6 col-xxl-5">
      <h2 class="display-6 h2 text-center m-5 fw-bold">Kimi Chat</h2>
      <div class="container-fluid w-100">
      <form>
        <div class="mb-3">
          <label for="personEmail" class="form-label fw-bold fs-5">Email</label>
          <input type="email" class="form-control rounded-pill" id="personEmail" placeholder="Introduce tu email"
            required>
        </div>
        <div class="mb-3">
          <label for="personName" class="form-label fw-bold fs-5">Nombre</label>
          <input type="text" class="form-control rounded-pill" id="personName" placeholder="Introduce tu nombre"
            required>
        </div>
        <div class="mb-3">
          <label for="roomList" class="form-label fw-bold fs-5">Room</label>
          <select class="form-select rounded-pill" aria-label="Default select example" id="roomList">
            <option value="newRoom">Nuevo Room</option>
            <option value="existingRoom">Room Existente</option>
          </select>
        </div>
        <div class="mb-3 roomIdDiv" style="display: none;">
          <label for="roomId" class="form-label fw-bold fs-5"">Room ID</label>
                <input type="number" class="form-control rounded-pill no-arrow roomIdInp" id="roomId"
            placeholder="Introduce el ID" name="roomId" required disabled>
        </div>
        <div class="mb-3 d-flex justify-content-center">
          <button type="submit" class="btn btn-success w-50 mt-4" id="btn-submit">Submit</button>
        </div>
        </form>
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

        .btn{
            width:200px;
        }

        .form-label{
            font-weight:700;
            font-size:20px;
        }

        .container-form{
            width:400px;
            height:400px;
            border: solid 3px #3A3C4C;
            display:flex;
            flex-direction: row;
            justify-content: center;
        }
        .form-input{
            height:50px;
        }

        .form{
            width:300px;
        
        }

        .container-button{
            margin-top:30px;
        }

        
        `;
        this.appendChild(style);
    }
}
customElements.define("home-page", Home)