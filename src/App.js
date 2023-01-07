import './App.css';
import Tasks from './components/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthProvider } from './context/authContex';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <div className='container p-4'>
        <div className='row'> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        {/* <Tasks /> -> aun no, debo hacer los registros de usuario */}
        {/* </div> */}

        {/* Alertas */}
        {/* <ToastContainer /> */}
        {/* </div> */}
      </Routes>

    </AuthProvider>
  );
}

export default App;
