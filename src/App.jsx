import { BrowserRouter, Route, Routes } from 'react-router-dom';
import classNameObj from "./App.module.css";
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import UsersContainer from './components/main/UsersContainer/UsersContainer';
import UsersProfilePageContainer from './components/main/UsersProfilePage/UsersProfilePageContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/main/Profile/ProfileContainer';

function App() {
  return (

    <BrowserRouter>
      <Provider store={store}>
        <div className={classNameObj.appContainer}>
          <div className={classNameObj.headerContainer}>
            <HeaderContainer />
          </div>
          <div className={classNameObj.navContainer}>
            <NavBar />
          </div>
          <main className={classNameObj.mainContainer}>
            <Routes>
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/profile/:userId' element={<UsersProfilePageContainer />} />
              <Route path='/users' element={<UsersContainer />} />
            </Routes>
          </main>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
