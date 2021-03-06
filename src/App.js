import React, { useContext, useEffect, useState } from 'react'
import { MachineManagement } from './Components/MachineManagement';
import { Navbar } from './Components/Navbar/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext'
import './App.css';
import { Footer } from './Components/Footer/Footer';

function App() {

  return (
    <ThemeProvider>
      <PageToRender />
    </ThemeProvider>
  );
}
export default App;

const PageToRender = () => {
  const themeContext = useContext(ThemeContext);
  const { themeState } = themeContext;

  useEffect(() => {
    document.body.classList.remove(`bg-${themeState}`)
    document.body.classList.add(`bg-${themeState === `light` ? `light` : `darker`}`)
  }, [themeState])

  return (
    <div className={`App bg-${themeState}`}>
      {console.log("Rendered!")}
      <header>
        <Navbar />
      </header>
      <section className="container-fluid" style={{marginTop: "100px"}}>
        <MachineManagement />
      </section>
      <footer style={{position: "fixed", bottom: "0px", width: "100%"}}>
        <Footer />
      </footer>
    </div>
  )
}
