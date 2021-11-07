import { MachineManagement } from './Components/MachineManagement';
import { Navbar } from './Components/Navbar';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <section className="container-fluid">
          <MachineManagement />
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;