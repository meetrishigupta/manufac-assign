import { useEffect, useState } from "react";
import dataset from "../Wine-Data.json"; //importing .json file as dataset
import "./Table.css";

export const GammaTable = () => {
  //Mean State Gamma
  const [Gammameanclassone, setGammameanclassone] = useState(0);
  const [Gammameanclasstwo, setGammameanclasstwo] = useState(0);
  const [Gammameanclassthree, setGammameanclassthree] = useState(0);
  //Median State Gamma
  const [Gammamedianclassone, setGammamedianclassone] = useState(0);
  const [Gammamedianclasstwo, setGammamedianclasstwo] = useState(0);
  const [Gammamedianclassthree, setGammamedianclassthree] = useState(0);
  //Mode State Gamma
  const [Gammamodeclassone, setGammamodeclassone] = useState(0);
  const [Gammamodeclasstwo, setGammamodeclasstwo] = useState(0);
  const [Gammamodeclassthree, setGammamodeclassthree] = useState(0);

  useEffect(() => {
    //class wise data & calculating the Gamma Property
    function classwiseDatawithGama() {
      const classoneGamma = dataset
        .filter((entry) => entry["Alcohol"] === 1)
        .map((item) => (item.Ash * item.Hue) / item.Magnesium);
      console.log(classoneGamma);
      const classtwoGamma = dataset
        .filter((entry) => entry["Alcohol"] === 2)
        .map((item) => (item.Ash * item.Hue) / item.Magnesium);
      console.log(classtwoGamma);
      const classthreeGamma = dataset
        .filter((entry) => entry["Alcohol"] === 3)
        .map((item) => (item.Ash * item.Hue) / item.Magnesium);
      console.log(classthreeGamma);
      setMedianModeMean(
        classoneGamma,
        setGammamedianclassone,
        setGammameanclassone,
        setGammamodeclassone
      );
      setMedianModeMean(
        classtwoGamma,
        setGammamedianclasstwo,
        setGammameanclasstwo,
        setGammamodeclasstwo
      );
      setMedianModeMean(
        classthreeGamma,
        setGammamedianclassthree,
        setGammameanclassthree,
        setGammamodeclassthree
      );
    }
    classwiseDatawithGama();
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

    // Checking if every value repeat the same number of times
    const allSameCount = Object.values(mode).every(
      (count) => count === mode[arr[0]]
    );

    if (allSameCount) {
      return 0;
    }

    return modes;
  }

  function setMedianModeMean(arr, setMedian, setMean, setMode) {
    //Call and passing data to function CalculateMedian
    const median = CalculateMedian(arr);
    const medianRoundoff = Math.round(median * 1000) / 1000;
    setMedian(medianRoundoff);
    //Call and passing data to function CalculateMean
    const mean = CalculateMean(arr);
    const meanRoundoff = Math.round(mean * 1000) / 1000;
    setMean(meanRoundoff);
    //Call and passing data to function calculateMode
    const mode = calculateMode(arr);
    setMode(mode);
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: 50 }}>Rendering and caculating Gamma table</h1>
      <table style={{ marginTop: -10 }} className="tabular">
        <tr>
          <td>Measure</td>
          <td style={{ fontWeight: "700" }}>Class 1</td>
          <td style={{ fontWeight: "700" }}>Class 2</td>
          <td style={{ fontWeight: "700" }}> Class 3</td>
        </tr>
        <tr>
          <td>Gamma Mean</td>
          <td>{Gammameanclassone}</td>
          <td>{Gammameanclasstwo}</td>
          <td>{Gammameanclassthree}</td>
        </tr>
        <tr>
          <td>Gamma Median</td>
          <td>{Gammamedianclassone}</td>
          <td>{Gammamedianclasstwo}</td>
          <td>{Gammamedianclassthree}</td>
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {/* Conditional Rendering if the value is been greater than 0  in state of mode so print the values  */}
          <td>{Gammamodeclassone === 0 ? "No Mode for Class 1" : 0}</td>
          <td>{Gammamodeclasstwo === 0 ? "No Mode for Class 2" : 0}</td>
          <td>{Gammamodeclassthree === 0 ? "No Mode for Class 3" : 0}</td>
        </tr>
      </table>
    </div>
  );
};
