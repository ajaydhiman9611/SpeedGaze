import React, { useContext, useEffect, useState } from 'react'
import { MachineManagement } from './Components/MachineManagement';
import { Navbar } from './Components/Navbar/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext'
import './App.css';

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
    document.body.classList.add(`bg-${themeState === `light` ? `darker` : `light`}`)
  }, [themeState])

  return (
    <div className={`App bg-${themeState}`}>
      <header>
        <Navbar />
      </header>
      <section className="container-fluid">
        <MachineManagement />
      </section>
    </div>
  )
}
