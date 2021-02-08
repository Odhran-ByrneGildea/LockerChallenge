import React, { useMemo, useState, useEffect } from "react";
import Data from 'C:/Users/odhra/Desktop/my-app/src/components/challenge.json'
import Table from "./components/Table";
import styled from 'styled-components'

const StyledInput = styled.input`
    border: 1px solid black;
    min-width: 20%;
    width: 700px;
    text-align: center;
`
function App() {
  const [data, setData] = useState([]);

  let competitors = Data.events[0].competitions[0].competitors;
  let orderedCompetitors = competitors.map((d) => {
    var roundScoreString = "";
    d.linescores.map((dd) => {
        roundScoreString += dd.value + " ";
      })
    return ({
      position: d.status.position.id,
      name: d.athlete.displayName,
      totalScore: d.score.displayValue,
      eachRoundTotal: roundScoreString,
      strokes: d.score.value

    });
  });
  useEffect(() => {
    (async () => {
      setData(orderedCompetitors)
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Competitors",
        columns: [
          {
            Header: "Position",
            accessor: "position",
          },
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Total Score",
            accessor: "totalScore"
          },
          {
            Header: "Each Round Score",
            accessor: "eachRoundTotal"
          },
          {
            Header: "Strokes",
            accessor: "strokes"
          },
        ]
      },
    ],
    []
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilterInput(value);
  };
 
  return (
    <div className="App">
      <StyledInput
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <Table columns={columns} data={data.filter(d=> filterInput ? d.name.toLowerCase().includes(filterInput.toLowerCase()) : d.name)} />
    </div>
  );
}

export default App;