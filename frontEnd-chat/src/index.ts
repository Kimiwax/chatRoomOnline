import "./pages/home";
import "./pages/chat"
import "./router";

import {state} from "./state";

state.init();









/*
import { state } from "./state";

(function () {
  state.init();
  state.setEmailAndName("pame@gmais.com", "Pamela");
  state.signIn(err => {
    if (err) console.log("Hubo un error en el signIn");
    state.askNewRoom(() => {
      state.accesToRoom();
    });
  });

 
  state.init();
  const cs = state.getState();
})();
*/