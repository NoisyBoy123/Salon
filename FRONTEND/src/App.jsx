import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './constants';
import Pocetna from './pages/Pocetna';

import Usluge from './pages/usluge/Usluge';
import UslugeDodaj from './pages/usluge/UslugeDodaj';
import UslugePromjena from './pages/usluge/UslugePromjena';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path={RoutesNames.HOME}
          element={<Pocetna />}
        />

        <Route
          path={RoutesNames.USLUGA_PREGLED}
          element={<Usluge />}
        />
        <Route
          path={RoutesNames.USLUGA_NOVI}
          element={<UslugeDodaj />}
        />
        <Route
          path={RoutesNames.USLUGA_PROMJENI}
          element={<UslugePromjena />}
        />
      </Routes>
    </>
  );
}

export default App;
