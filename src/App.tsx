import './App.css';
import { ClassesApp } from './features/classes-app/classes-app.feature';
import Navbar from './features/classes-app/components/navbar/navbar.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentsScreen } from './features/classes-app/screens/students.screen';
import { DrawerProvider} from './features/context';
import { StudentProvider } from './features/context/StudentContext';
import { StudentDrawer } from './features/classes-app/components/studentdrawer';

function App() {
  return (
    <>
      <Router>
        <StudentProvider>
        <DrawerProvider>
        <Navbar/>
        <StudentDrawer>
        <Routes>
          <Route path='/' element={<ClassesApp/>}/>
          <Route path="/class/:classId" element={<StudentsScreen/>} />
        </Routes>
        </StudentDrawer>
        </DrawerProvider>
        </StudentProvider>
        
      </Router>

    </>
  );
}

export default App;
