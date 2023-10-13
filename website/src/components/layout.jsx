import React from "react";
import aStar from "../../utility/Astar_pathFinder";
import { useState, useEffect } from "react";
import itemList from "../constants/itemImages";
import itemNames from "../constants/itemNames";
// Assuming you have source and destination coordinates
let sourceRow = 0;
let sourceCol = 0;
let destRow = 0;
let destCol = 0;
const cellSize = 40;

function calculateCenterPosition(row, col) {
  const [source,setsource]=useState(null)
  const [destination,setdestination]=useState(null);
  // Calculate the center position of the cell
  const x = (col + 1) * cellSize + cellSize / 2 - 20;
  const y = (row + 1) * cellSize + cellSize / 2 - 20;
  return { x, y };
}

const Layout = () => {
  const gridState = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1],
  ];
  const stops = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [4, 3],
    [5, 3],
    [5, 4],
    [5, 5],
    [1, 5],
  ];
  const [source, setSource] = useState({ row: -1, col: -1 });
  const [destination, setDestination] = useState({ row: -1, col: -1 });

  let counter = 0;
  const updatesource=()=>{
    setSource([1,1])
    console.log("source updated")
  };
  const updatedestination=()=>{
    setDestination([2,3])
  }
  const drawArrow = (stops) => {
    counter += 1;
    console.log("counter ", counter);
    let arrowHTML = [];
    for (let i = 0; i < stops.length - 1; i++) {
      let tempSource = stops[i];
      const tempDest = stops[i + 1];
      const tempPath = aStar(gridState, tempSource, tempDest);
      // console.log(i, " ", tempPath)

      for (let j = 0; j < tempPath.length; j++) {
        // console.log('i = ', i, 'j = ', j)
        let dest = [
          tempSource[0] + tempPath[j][0],
          tempSource[1] + tempPath[j][1],
        ];
        source.row = tempSource[0];
        source.col = tempSource[1];
        destination.row = dest[0];
        destination.col = dest[1];
        // console.log(source.row,source.col,destination.row,destination.col)
        const sourceCenter = calculateCenterPosition(source.row, source.col);
        const destinationCenter = calculateCenterPosition(
          destination.row,
          destination.col
        );
        if (source.row !== -1 && destination.row !== -1) {
          const dx = destinationCenter.x - sourceCenter.x;
          const dy = destinationCenter.y - sourceCenter.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          arrowHTML.push(
            <div
            style={{
              className:"animate-bounce",
              top: sourceCenter.y,
              left: sourceCenter.x,
              width: Math.sqrt(dx * dx + dy * dy),
              transform: `rotate(${angle}deg)`,
              transformOrigin: "left center",
              borderRadius: "5px",
              borderBottom: "7px dashed green", // Arrow styling as a dashed line
              position: "absolute",
              animation: "moveDots 2s linear infinite", // Add animation
            }}
          ></div>
          );
          // arrowHTML.push(
          //   <div
          //     style={{
          //       top: destinationCenter.y,
          //       left: destinationCenter.x,
          //       width: 15,
          //       transform: `rotate(${angle + 160}deg)`,
          //       transformOrigin: "left center",
          //       borderBottom: "2px solid red", // Arrow styling
          //       position: "absolute",
          //     }}
          //   >
              
          //   </div>
          // );
          // arrowHTML.push(
          //   <div
          //     style={{
          //       top: destinationCenter.y,
          //       left: destinationCenter.x,
          //       width: 15,
          //       transform: `rotate(${angle + 200}deg)`,
          //       transformOrigin: "left center",
          //       borderBottom: "2px solid red", // Arrow styling
          //       position: "absolute",
          //     }}
          //   >   
            // </div>
          // );

          tempSource = [...dest];
        }
      }
    }
    // console.log("outputHtml ", arrowHTML)
    // return outputHtml;
    return arrowHTML;
  };
  const grid = [
    [ 16,  11,  12,  1,  41,  102,  10,0],
    [ 13,  1,  1,  1,  50,  1,  45,0],
    [ 14,  1,  1,  1,  52,  1,  18,0],
    [ 15,  66,  67,  1,  55,  1,  39,0],
    [ 0,  0,  0,  1,  68,  1,  30,0],
    [ 0,  61,  93,  1,  1,  1,  35,0],
    [ 0,  74,  1,  1,  52,  0,  40,0],
    [ 0,  75,  1,  1,  0,  0,  0,0],
  ];
  // const grid=[
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,11,11,11,12,12,12,13,14,0],
  //   [0,0,0,0,0,0,0,0,14,0],
  //   [0,0,0,0,0,0,0,0,15,0],
  //   [0,0,0,0,0,0,0,0,120,0],
  //   [0,0,0,0,0,1,18,1,126,0],
  //   [0,0,0,0,0,1,17,1,100,0],
  //   [0,0,0,0,0,1,16,1,90,0],
  //   [0,0,0,0,0,0,15,1,80,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  // ];
  return (
    <div className="relative">

      <div
        className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg"
        style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((image, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-10 h-10" // Adjust this for the size of each cell
            >
              <img src={itemList[image]} alt="" className="w-full h-full" />
            </div>
          ))
        )}
        <div className="&larr"></div>

         {drawArrow([
    [1, 1],
    [2, 2],
    [2, 3],
    [4, 3],
    [5, 3],
    [5, 4],
    [5, 5],
    [1, 5],
  ])} 
      </div>
    <button onClick={updatesource}>update source</button>
    <button onClick={updatedestination}>update destination</button>
    </div>
  );
};

export default Layout;
