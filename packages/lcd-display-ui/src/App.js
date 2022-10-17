import './App.css';
import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MoodTableContextProvider from "./context/MoodTableContext";
import {Container} from "./Container";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontSize: 26,
    },
});

function App() {
    return (
        <MoodTableContextProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Container />
            </ThemeProvider>
        </MoodTableContextProvider>
    );
}
export default App;
