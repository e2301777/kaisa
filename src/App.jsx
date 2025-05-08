import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Build from "./components/Build";
import Search from "./components/Search";
import BuildContextProvider, { BuildContext } from "./components/build-context";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, colorScheme, setTheme } = useContext(BuildContext);

  // Update the background image and color scheme of the root element when theme changes.
  useEffect(() => {
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.backgroundImage = `url(${new URL(`./assets/${theme}`, import.meta.url).href})`;
      rootEl.style.setProperty("--primary-color", colorScheme.primary);
      rootEl.style.setProperty("--secondary-color", colorScheme.secondary);
      rootEl.style.setProperty("--accent-color", colorScheme.accent);
    }
  }, [theme, colorScheme]);

  const themeImages = [
    "Default.PNG",
    "BulletAngel.PNG",
    "KDA.PNG",
    "PrestigeKDA.PNG",
    "KDAALLOUT.PNG",
    "PrestigeKDAALLOUT.PNG",
    "iG.PNG",
    "Arcade.PNG",
    "StarGuardian.PNG",
    "Heavenscale.PNG",
    "Inkshadow.PNG",
    "LagoonDragon.PNG",
  ];

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const selectTheme = (imageName) => {
    setTheme(imageName);
    toggleModal();
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Search />
        <Build />
        <Stats />
      </div>

      <button className="settings-button" onClick={toggleModal}>
        Theme selector
      </button>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="settings-modal">
            <h2>Theme selector</h2>
            <div className="theme-selector">
              {themeImages.map((img, index) => (
                <button key={index} className="theme-btn" onClick={() => selectTheme(img)}>
                  <img src={new URL(`./assets/${img}`, import.meta.url).href} alt={img} title={img}/>
                </button>
              ))}
            </div>
            <button className="theme-btn" onClick={toggleModal}>Close</button>
          </div>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BuildContextProvider>
      <AppContent />
    </BuildContextProvider>
  );
}

export default App;