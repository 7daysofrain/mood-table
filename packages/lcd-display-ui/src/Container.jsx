import React, {useEffect, useContext} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import WSSBridgeClient from "@mood-table/shared/src/wss-bridge/client";
import appState from "@mood-table/shared/src/models/app-state";
import {MoodTableContext} from "./context/MoodTableContext";
import TabPanel from "./components/tab-panel/tab-panel";
import SquareButton from "./components/square-button/square-button";
import { effects } from '@mood-table/shared/src/config/effects'

export function Container(props) {
    const [value, setValue] = React.useState(0);
    const { wss } = useContext(MoodTableContext);
    useEffect(() => {
        wss.current = new WSSBridgeClient();
        wss.current.addEventListener('stateUpdated', updateState);
    }, []);
    const changeFX = fx => {
        wss.current?.changeFX(fx);
    }
    const updateState = event => {
        console.log(event.data.message);
        appState.updateState(event.data.message);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="App">
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Ambient FX"/>
                    <Tab label="Dynamic FX"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {effects.map(fx => (
                    <SquareButton
                        onClick={() => changeFX(fx.name)}
                        color={`rgb(${fx.mainColor[0]},${fx.mainColor[1]},${fx.mainColor[2]}) `}
                    >{fx.name}</SquareButton>
                ))}

            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div>
    )
}
