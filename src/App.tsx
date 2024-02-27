import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getCustomTheme, getMuiTheme, routesConfig } from './config';
import { GlobalStyle } from './config';
import { ThemeProvider as CustomThemeProvider } from '@emotion/react';

// MUI Theme
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

//React-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from './app/hooks';
import { getMyBookings } from './api/endpoints/ticket.api';

const basename = '/';

const router = createBrowserRouter(routesConfig, {
    basename,
});

function App() {
    const mode = useAppSelector((state) => state.theme.currentTheme);

    return (
        <>
            <ToastContainer theme={mode} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MuiThemeProvider theme={createTheme(getMuiTheme(mode))}>
                    <CustomThemeProvider theme={getCustomTheme(mode)}>
                        <GlobalStyle />
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </CustomThemeProvider>
                </MuiThemeProvider>
            </LocalizationProvider>
        </>
    );
}

export default App;
