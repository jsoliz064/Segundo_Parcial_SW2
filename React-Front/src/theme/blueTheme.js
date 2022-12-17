import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#0E40E9'
        },
        secondary: {
            main: '#2671E5'
        },
        error: {
            main: red.A400
        },
        disable: {
            main: '#FCFCFC'
        }
    }

});