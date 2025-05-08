import { useState, useContext } from "react";
import { BuildContext } from "./build-context";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { itemData, addItemToBuild, buildFull, resetBuildFull } =
    useContext(BuildContext);

  function handleAddItemToBuild(item) {
    addItemToBuild(item);
    if (buildFull) {
      setTimeout(() => resetBuildFull(), 2000); // Reset the buildFull state after 2 seconds
    }
  }

  return (
    <div className="search-container">
      <h2>Search items</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          setFilteredItems(
            Object.entries(itemData).filter(([id, item]) =>
              item.name.toLowerCase().includes(value)
            )
          );
        }}
      />
      {buildFull && <p>Build full!</p>}
      <div className="items-container">
        {filteredItems.map(([id, item]) => (
          <button className="item" key={id} onClick={() => handleAddItemToBuild(item)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}