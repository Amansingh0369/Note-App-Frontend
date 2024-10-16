import './App.css';
import Landing from "./components/Landing.jsx";
import Notes from "./components/Notes.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BackgroundMusic from "./components/audio.jsx";

function App() {
    const location = useLocation();

    return (
        <>
            <BackgroundMusic />
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="fade"
                >
                    <Routes location={location}>
                        <Route path='/' element={<Landing />} />
                        <Route path='/Signup' element={<Signup />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/Notes' element={<Notes />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default App;
