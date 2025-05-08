import { useContext } from "react";
import { BuildContext } from "./build-context";

const kaisalvlAd = [0, 1.9, 3.8, 5.9, 8.0, 10.3, 12.6, 15.0, 17.5, 20.1, 22.8, 25.6, 28.5, 31.4, 34.5, 37.6, 40.9, 44.2];
const kaisalvlAs = [0, 1.3, 2.7, 4.1, 5.6, 7.1, 8.7, 10.4, 12.1, 13.9, 15.8, 17.7, 19.7, 21.8, 23.9, 26.1, 28.3, 30.6];

export default function Stats() {
  const { stats, level } = useContext(BuildContext);

  const getStatStyle = (value) => ({
    color: value.toFixed(0) >= 100 ? "green" : "white",
  });

  const levelAd = kaisalvlAd[level - 1]; // Adjust for 0-based index
  const levelAs = kaisalvlAs[level - 1]; // Adjust for 0-based index

  return (
    <div className="stats-container">
      <h2>Current bonus stats</h2>
      <h3 style={getStatStyle(stats.ad + levelAd)}>Bonus AD: {(stats.ad + levelAd).toFixed(0)} / 100</h3>
      <h3 style={getStatStyle(stats.ap)}>Bonus AP: {stats.ap} / 100</h3>
      <h3 style={getStatStyle((stats.as * 100) + levelAs)}>
        Bonus AS: {((stats.as * 100) + levelAs).toFixed(0)} / 100
      </h3>
    </div>
  );
}