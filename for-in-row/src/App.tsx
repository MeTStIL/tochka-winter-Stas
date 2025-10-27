import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from "./constants.ts";
import ReactVite from "./pages/ReactVite.tsx";
import Game from "./pages/game.tsx";

function App() {

    return (
        <>
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>

                        <Route
                            path={AppRoute.Main}
                            element={<ReactVite/>}
                        />

                        <Route
                            path={AppRoute.Game}
                            element={<Game/>}
                        />

                        <Route
                            path={AppRoute.Secret}
                            element={<ReactVite/>}
                        />

                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        </>
    )
}

export default App
