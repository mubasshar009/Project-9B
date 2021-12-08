import React, { FC,   lazy, Suspense} from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { useSelector} from 'react-redux'
import { RootState } from "../rootReducers";

const Auth = lazy(() => import('../features/auth/Auth'));
const Home = lazy(() => import("../features/home/Home"))



const App:FC =  ()=> {
  const isLoggedIn = useSelector(
    (state:RootState) => state.auth.isAuthenticated
  )
  return (
    <React.Suspense fallback={<p>Loading ....</p>}>
    <Router>
      
      <Routes>
        
        <Route path="/" element={ isLoggedIn ? <Home /> : <Auth />}>
          
          
          
        </Route>
        
      </Routes>
      
    </Router>
    </React.Suspense>
  );
}

export default App;
