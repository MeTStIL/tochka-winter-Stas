import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from "./constants.ts";
import Game from "./pages/game/game.tsx";
import Welcome from "./pages/welcome/welcome.tsx";
import NotFound from "./pages/not-found/not-found.tsx";

function App() {

    return (
        <>
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>

                        <Route
                            path={AppRoute.Main}
                            element={<Welcome/>}
                        />

                        <Route
                            path={AppRoute.Game}
                            element={<Game/>}
                        />

                        <Route
                            path={'*'}
                            element={<NotFound/>}
                        />

                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        </>
    )
}

export default App
