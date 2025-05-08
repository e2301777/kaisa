import { useState, useContext } from "react";
import { BuildContext } from "./build-context";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { itemData, addItemToBuild, buildFull, resetBuildFull } =
    useContext(BuildContext);

  function checkItem(event) {
    const value = event.target.value;
    setSearchTerm(value);

    if (itemData) {
      const matchingItems = Object.entries(itemData).filter(([id, item]) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(matchingItems); // Store entries as [id, item]
    }
  }

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
        value={searchTerm}
        onChange={checkItem}
        placeholder="Search..."
      />
      {buildFull && <p>Build full!</p>}
      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map(([id, item]) => (
            <button
              key={id}
              className="item"
              onClick={() => handleAddItemToBuild(item)}
            >
              {item.name}
            </button>
          ))
        ) : (
          <p>No matching items found</p>
        )}
      </div>
    </div>
  );
}