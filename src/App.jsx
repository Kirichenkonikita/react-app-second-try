import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import classNameObj from "./App.module.css";
import NavBar from './NavBar/NavBar';
import Profile from './main/Profile/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (

    <BrowserRouter>
      <Provider store={store}>
        <div className={classNameObj.appContainer}>
          <div className={classNameObj.headerContainer}>
            <Header />
          </div>
          <div className={classNameObj.navContainer}>
            <NavBar />
          </div>
          <main className={classNameObj.mainContainer}>
            <Routes>
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
