import AppState from "./app-state.js";
import {types} from "mobx-state-tree";

const RootStore = types.model({
    app: types.map(AppState),
})
const rootStore = RootStore.create();
export default rootStore;
