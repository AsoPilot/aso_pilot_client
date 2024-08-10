import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './components/login/login'
import MainContent from './components/login/MainContent'
import OrgForm from "./components/login/Orgform";
import RegSuccess from "./components/login/RegSuccess";
import MainLayout from "./layout";
function App() {

  return (
    <>
      <div className="App">
        <MainContent />
        <BrowserRouter>
          {/* {token && <Sidebar />} */}
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/about-org" element={<OrgForm />}></Route>
            <Route exact path="/reg_success" element={<RegSuccess />}></Route>
            <Route exact path="/dashboard" element={<MainLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
