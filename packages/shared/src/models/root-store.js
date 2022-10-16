import AppState from "./app-state.js";
import {types} from "mobx-state-tree";
//import makeInspectable from 'mobx-devtools-mst';

const RootStore = types.model({
    app: types.map(AppState),
})
const rootStore = RootStore.create();

//makeInspectable(rootStore);
export default rootStore;
