import { MachineManagement } from './Components/MachineManagement';
import { Navbar } from './Components/Navbar/Navbar';
import './App.css';
function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <section className="container-fluid">
        <MachineManagement />
      </section>
    </div>
  );
}

export default App;