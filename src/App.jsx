import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import classNameObj from "./App.module.css";
import NavBar from './components/NavBar/NavBar';
import Profile from './components/main/Profile/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';
import UsersContainer from './components/main/Users/UsersContainer';

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
              <Route path='/users' element={<UsersContainer />} />
            </Routes>
          </main>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
