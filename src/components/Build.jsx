import { useContext } from "react";
import { BuildContext } from "./build-context";

export default function Build() {
  const { itemsInBuild, removeItemFromBuild, updateLevel, level, resetBuildFull } = useContext(BuildContext);

  function handleRemoveItem(index) {
    removeItemFromBuild(index);
    resetBuildFull(); // Reset the "build full" state when an item is removed
  }

  return (
    <div className="build-container">
      <h2>Current build</h2>
      <h3>Champion lvl: {level}</h3>
      <input
        type="range"
        name="level"
        onChange={(e) => updateLevel(parseInt(e.target.value, 10))}
        min={1}
        max={18}
        defaultValue={level}
      />
      <div className="build-items">
        {itemsInBuild.map((item, index) => {
          // Dynamically construct the title based on available stats
          const stats = [];
          if (item.stats.FlatPhysicalDamageMod) {
            stats.push(`AD: ${item.stats.FlatPhysicalDamageMod}`);
          }
          if (item.stats.FlatMagicDamageMod) {
            stats.push(`AP: ${item.stats.FlatMagicDamageMod}`);
          }
          if (item.stats.PercentAttackSpeedMod) {
            stats.push(`AS: ${(item.stats.PercentAttackSpeedMod * 100)}%`);
          }
          const title = stats.join(", ");

          return (
            <div key={index}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/15.7.1/img/item/${item.image.full}`}
                alt={item.name}
                title={title} // Dynamically set the title
              />
              <img
                className="delete-icon"
                src="delete.PNG"
                alt="delete"
                onClick={() => handleRemoveItem(index)}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}