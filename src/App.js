import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {
  return (

   <BrowserRouter>
     <Routes>
       <Route excat path ='/' element={<Home></Home>}></Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;