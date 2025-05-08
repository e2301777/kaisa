import { useContext } from "react";
import { BuildContext } from "./build-context";

export default function Build() {
  const { itemsInBuild, removeItemFromBuild, updateLevel, level } = useContext(BuildContext);

  function handleSliderChange(event) {
    const newLevel = parseInt(event.target.value, 10);
    updateLevel(newLevel); // Update the level in the context
  }

  return (
    <div className="build-container">
      <h2>Current build</h2>
      <h3>Champion lvl: {level}</h3>
      <input
        type="range"
        name="level"
        onChange={handleSliderChange}
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
                src="../src/assets/delete.PNG"
                alt="delete"
                onClick={() => removeItemFromBuild(index)}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}