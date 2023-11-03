import "./Table.css";
import dataset from "../Wine-Data.json"; //importing .json file as dataset
import { useEffect, useState } from "react";

export const TableData = () => {
    //Median State Gamma
  const [classonemedian, setmedianclassone] = useState(0);
  const [classtwomedian, setmedianclasstwo] = useState(0);
  const [classthreemedian, setmedianclassthree] = useState(0);
  //Mean State Gamma
  const [classonemean, setmeanclassone] = useState(0);
  const [classtwomean, setmeanclasstwo] = useState(0);
  const [classthreemean, setmeanclassthree] = useState(0);
  //Mode State Gamma
  const [classonemode, setmodeclassone] = useState(0);
  const [classtwomode, setmodeclasstwo] = useState(0);
  const [classthreemode, setmodeclassthree] = useState(0);

  useEffect(() => {
    //Class wise data values
    function classWiseValues() {
      const classoneFlavanoids = dataset
        .filter((entry) => entry["Alcohol"] === 1)
        .map((entry) => entry["Flavanoids"]);
      console.log("Class 1 Flavournids", classoneFlavanoids);

      const classtwoFlavnoids = dataset
        .filter((entry) => entry["Alcohol"] === 2)
        .map((entry) => entry["Flavanoids"]);
      console.log("Class 2 Flavonois", classtwoFlavnoids);
      const classthreeFlavnoids = dataset
        .filter((entry) => entry["Alcohol"] === 3)
        .map((entry) => entry["Flavanoids"]);
      console.log("Class 3 Flavonois", classthreeFlavnoids);
      setMedianModeMean(
        classoneFlavanoids,
        setmedianclassone,
        setmeanclassone,
        setmodeclassone
      );
      setMedianModeMean(
        classtwoFlavnoids,
        setmedianclasstwo,
        setmeanclasstwo,
        setmodeclasstwo
      );
      setMedianModeMean(
        classthreeFlavnoids,
        setmedianclassthree,
        setmeanclassthree,
        setmodeclassthree
      );
    }

    classWiseValues();
  }, [dataset]);

  //Calculating Median
  function CalculateMedian(arr) {
    const sort = arr.sort((a, b) => a - b);
    if (sort.length === 0) {
      return 0;
    }
    const half = Math.floor(sort.length / 2);
    if (sort.length % 2 === 0) {
      return (sort[half - 1] + sort[half]) / 2;
    } else {
      return sort[half];
    }
  }
  //Calculating Mean
  function CalculateMean(arr) {
    const plusValues = arr.reduce((acc, value) => acc + value, 0);
    const lenghtharray = arr.length;
    return plusValues / lenghtharray;
  }

  //Calculating Mode
  function calculateMode(arr) {
    let mode = {};
    let maxCount = 0;
    let modes = [];

    arr.forEach(function (item) {
      if (mode[item] === undefined) {
        mode[item] = 1;
      } else {
        mode[item]++;
      }

      if (mode[item] > maxCount) {
        modes = [item];
        maxCount = mode[item];
      } else if (mode[item] === maxCount) {
        modes.push(item);
      }
    });
    const allSameCount = Object.values(mode).every(
      (count) => count === mode[arr[0]]
    );

    if (allSameCount) {
      return 0;
    }
    return modes;
  }

  //setting state median Values
  function setMedianModeMean(arr, setMedian, setMean, setMode) {
    //Call and passing data to function CalculateMedian
    const median = CalculateMedian(arr);
    const medianRoundoff = Math.round(median * 1000) / 1000;
    setMedian(medianRoundoff);
    //Call and passing data to function CalculateMean
    const mean = CalculateMean(arr);
    const meanRoundoff = Math.round(mean * 1000) / 1000;
    setMean(meanRoundoff);
    //Call and passing data to function calculateMode\
    const mode = calculateMode(arr);
    const joinarraymode = mode.join(", ");
    setMode(joinarraymode);
  }

  return (
    <div className="container">
      <h1>Rendering and caculating normal table</h1>
      <table className="tabular">
        <tr>
          <td>Measure</td>
          <td style={{ fontWeight: "700" }}>Class 1</td>
          <td style={{ fontWeight: "700" }}>Class 2</td>
          <td style={{ fontWeight: "700" }}> Class 3</td>
        </tr>
        <tr>
          <td>Flavanoids Mean</td>
          <td>{classonemean}</td>
          <td>{classtwomean}</td>
          <td>{classthreemean}</td>
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          <td>{classonemedian}</td>
          <td>{classtwomedian}</td>
          <td>{classthreemedian}</td>
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          <td>{classonemode}</td>
          <td>{classtwomode}</td>
          <td>{classthreemode}</td>
        </tr>
      </table>
    </div>
  );
};
