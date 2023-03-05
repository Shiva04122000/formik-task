import './App.css';
import ReactForm from './components/ReactForm';
import { BrowserRouter as Browser, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';

function App() {
  return (

    <Browser >
      <Routes>
        <Route path='/' element={<ReactForm />} />
        <Route path='/usertable' element={<UserTable />} />
      </Routes>
    </Browser>
  );
}

export default App;
