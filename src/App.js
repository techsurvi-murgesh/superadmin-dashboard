import './App.scss';                                                                                                                            
import { useState } from 'react';
import LoginPage from './Auth/login/login';
import AdminSidebar from './component/adminSidebar';

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('authToken'))

  return (
    <div style={{height:'100%'}}>
      {
        !token ? (
          <LoginPage />
        ) : (
          <AdminSidebar />
        )
      }    
    </div>
  );
}

export default App;
