import { useEffect, useState, CSSProperties } from "react";
import Table from "rc-table";
import "./styles.css";

interface IStrike {
  CallLTP: number;
  CallDelta: number;
  StrikePrice: number;
  PutLTP: number;
  PutDelta: number;
}

interface IOptionChain {
  atmstrike: number;
  spotprice: number;
  futuresprice: number;
  data: Array<IStrike>;
}

const App = () => {
  const [optionData, setOptionData] = useState<IOptionChain>({
    atmstrike: 0,
    spotprice: 0,
    futuresprice: 0,
    data: []
  });

  useEffect(() => {
    setInterval(() => {
      console.log("Fetching!");
      fetch(
        "https://opstra.definedge.com/api/openinterest/optionchain/NIFTY&02DEC2021"
      ).then((res) =>
        res.json().then((d: IOptionChain) =>
          setOptionData({
            ...d,
            data: d.data?.map((row) => ({ ...row, key: row.StrikePrice }))
          })
        )
      );
    }, 60000);
  }, []);

  const columnHeaderStyle: CSSProperties = {
    backgroundColor: "#3a2d7d",
    padding: "10px",
    color: "white",
    fontWeight: "normal"
  };

  const columns = [
    {
      title: <div style={columnHeaderStyle}>Call LTP</div>,
      dataIndex: "CallLTP",
      key: "CallLTP",
      width: 100,
      render: (val: IStrike['CallLTP'], row: IStrike) => (
        <div
          style={{
            backgroundColor:
              row.StrikePrice < optionData.atmstrike
                ? "#ffcccb"
                : row.StrikePrice === optionData.atmstrike
                ? "#87CEFA"
                : "#f1eed9",
            padding: "6px 0"
          }}
        >
          {val}
        </div>
      )
    },
    {
      title: <div style={columnHeaderStyle}>Call Delta</div>,
      dataIndex: "CallDelta",
      key: "CallDelta",
      width: 100,
      render: (val: IStrike["CallDelta"], row: IStrike) => (
        <div
          style={{
            backgroundColor:
              row.StrikePrice < optionData.atmstrike
                ? "#ffcccb"
                : row.StrikePrice === optionData.atmstrike
                ? "#87CEFA"
                : "#f1eed9",
            padding: "6px 0"
          }}
        >
          Δ {val}
        </div>
      )
    },
    {
      title: <div style={columnHeaderStyle}>Strike</div>,
      dataIndex: "StrikePrice",
      key: "StrikePrice",
      width: 100,
      render: (val: IStrike['StrikePrice'], row: IStrike) => (
        <div
          style={{
            backgroundColor:
              row.StrikePrice === optionData.atmstrike ? "#87CEFA" : "#FFFFFF",
            padding: "6px 0"
          }}
        >
          {val}
        </div>
      )
    },
    {
      title: <div style={columnHeaderStyle}>Put Delta</div>,
      dataIndex: "PutDelta",
      key: "PutDelta",
      width: 100,
      render: (val: IStrike['PutDelta'], row: IStrike) => (
        <div
          style={{
            backgroundColor:
              row.StrikePrice > optionData.atmstrike
                ? "#A1E8A1"
                : row.StrikePrice === optionData.atmstrike
                ? "#87CEFA"
                : "#f1eed9",
            padding: "6px 0"
          }}
        >
          Δ {val}
        </div>
      )
    },
    {
      title: <div style={columnHeaderStyle}>Put LTP</div>,
      dataIndex: "PutLTP",
      key: "PutLTP",
      width: 100,
      render: (val: IStrike['PutLTP'], row: IStrike) => (
        <div
          style={{
            backgroundColor:
              row.StrikePrice > optionData.atmstrike
                ? "#A1E8A1"
                : row.StrikePrice === optionData.atmstrike
                ? "#87CEFA"
                : "#f1eed9",
            padding: "6px 0"
          }}
        >
          {val}
        </div>
      )
    }
  ];

  return (
    <div className="App">
      <Table columns={columns} data={optionData.data} />
    </div>
  );
};

export default App;
