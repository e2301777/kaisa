import { createContext, useReducer, useEffect, useState } from "react";

export const BuildContext = createContext();

const themeColorSchemes = {
  "Default.PNG": { primary: "#ffffff", secondary: "#140027", accent: "#671577" },
  "BulletAngel.PNG": { primary: "#ffffff", secondary: "#252458", accent: "#aeaeaf" },
  "KDA.PNG": { primary: "#ff66cc", secondary: "#40007c", accent: "#eeb61d" },
  "PrestigeKDA.PNG": { primary: "#ffcc99", secondary: "#663300", accent: "#ff9966" },
  "KDAALLOUT.PNG": { primary: "#cc99ff", secondary: "#2a0470", accent: "#a5dbfa" },
  "PrestigeKDAALLOUT.PNG": { primary: "#a5dbfa", secondary: "#663300", accent: "#db98fa" },
  "iG.PNG": { primary: "#ffffff", secondary: "#00031b", accent: "#9fe0fa" },
  "Arcade.PNG": { primary: "#50cccc", secondary: "#683281", accent: "#0aad69" },
  "StarGuardian.PNG": { primary: "#ff99ff", secondary: "#660066", accent: "#e7b100" },
  "Heavenscale.PNG": { primary: "#e7b100", secondary: "#003333", accent: "#e77000" },
  "Inkshadow.PNG": { primary: "#cc0000", secondary: "#141414", accent: "#990000" },
  "LagoonDragon.PNG": { primary: "#66ccff", secondary: "#005c5c", accent: "#8f7e51" },
};

function buildReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.itemsInBuild.length < 6) {
        const newStats = { ...state.stats };
        if (action.payload.stats.FlatPhysicalDamageMod) {
          newStats.ad += action.payload.stats.FlatPhysicalDamageMod;
        }
        if (action.payload.stats.FlatMagicDamageMod) {
          newStats.ap += action.payload.stats.FlatMagicDamageMod;
        }
        if (action.payload.stats.PercentAttackSpeedMod) {
          newStats.as += action.payload.stats.PercentAttackSpeedMod;
        }
        return {
          ...state,
          itemsInBuild: [...state.itemsInBuild, action.payload],
          stats: newStats,
        };
      }
      return { ...state, buildFull: true };

    case "REMOVE_ITEM":
      {
        const removedItem = state.itemsInBuild[action.payload];
        const updatedStats = { ...state.stats };
        if (removedItem.stats.FlatPhysicalDamageMod) {
          updatedStats.ad -= removedItem.stats.FlatPhysicalDamageMod;
        }
        if (removedItem.stats.FlatMagicDamageMod) {
          updatedStats.ap -= removedItem.stats.FlatMagicDamageMod;
        }
        if (removedItem.stats.PercentAttackSpeedMod) {
          updatedStats.as -= removedItem.stats.PercentAttackSpeedMod;
        }
        return {
          ...state,
          itemsInBuild: state.itemsInBuild.filter((item, index) => index !== action.payload),
          stats: updatedStats,
        };
      }

    case "UPDATE_LEVEL":
      return {
        ...state,
        level: action.payload.level,
      };

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload.theme,
        colorScheme: themeColorSchemes[action.payload.theme],
      };

    default:
      return state;
  }
}

export default function BuildContextProvider({ children }) {
  const savedTheme = localStorage.getItem("theme") || "Default.PNG";

  const [buildState, buildDispatch] = useReducer(buildReducer, {
    itemsInBuild: [],
    buildFull: false,
    stats: { ad: 0, ap: 0, as: 0 },
    level: 1, // Default champion level
    theme: savedTheme,
    colorScheme: themeColorSchemes[savedTheme],
  });

  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/cdn/15.7.1/data/en_US/item.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.entries(data.data)
          .filter(([id, item]) => !(item.maps && item.maps[30]))
          .reduce((acc, [id, item]) => {
            acc[id] = item;
            return acc;
          }, {});
        setItemData(filteredData);
      })
      .catch((error) => console.error("Error fetching item data:", error));
  }, []);

  const addItemToBuild = (item) => {
    buildDispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromBuild = (index) => {
    buildDispatch({ type: "REMOVE_ITEM", payload: index });
  };

  const updateLevel = (level) => {
    buildDispatch({ type: "UPDATE_LEVEL", payload: { level } });
  };

  const setTheme = (theme) => {
    buildDispatch({ type: "SET_THEME", payload: { theme } });
    localStorage.setItem("theme", theme); // Save the theme to local storage
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      buildDispatch({ type: "SET_THEME", payload: { theme: savedTheme } });
    }
  }, []);

  return (
    <BuildContext.Provider
      value={{
        itemsInBuild: buildState.itemsInBuild,
        buildFull: buildState.buildFull,
        stats: buildState.stats,
        level: buildState.level,
        theme: buildState.theme,
        colorScheme: buildState.colorScheme,
        itemData,
        addItemToBuild,
        removeItemFromBuild,
        updateLevel,
        setTheme,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}