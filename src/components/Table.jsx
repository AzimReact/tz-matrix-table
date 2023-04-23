import React, { useState, useEffect } from "react";

const Table = ({ data }) => {
  const rows = data.length;
  const columns = data[0].months.length;
  const [inputs, setInputs] = useState(() => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      arr.push([]);
      for (let j = 0; j < columns; j++) {
        arr[i].push(data[i].months[j].value);
      }
    }
    return arr;
  });
  const [totalSum, setTotalSum] = useState(0);
  const [columnSums, setColumnSums] = useState(() => {
    const arr = [];
    for (let i = 0; i < columns; i++) {
      arr.push(0);
    }
    return arr;
  });
  const [rowSums, setRowSums] = useState(() => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      arr.push(0);
    }
    return arr;
  });

  useEffect(() => {
    let newTotalSum = 0;
    const newColumnSums = [];
    for (let i = 0; i < columns; i++) {
      newColumnSums.push(0);
    }
    const newRowSums = [];
    for (let i = 0; i < rows; i++) {
      newRowSums.push(0);
    }
    inputs.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        newTotalSum += value;
        newColumnSums[colIndex] += value;
        newRowSums[rowIndex] += value;
      });
    });
    setTotalSum(newTotalSum);
    setColumnSums(newColumnSums);
    setRowSums(newRowSums);
  }, [inputs, rows, columns]);

  const handleInputChange = (event, rowIndex, colIndex) => {
    const newValue = parseInt(event.target.value) || 0; // Convert value to number or 0
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((row, i) => {
        if (i === rowIndex) {
          return row.map((value, j) => {
            return j === colIndex ? newValue : value;
          });
        }
        return row;
      });
      return newInputs;
    });
  };

  const columnHeaders = [];
  for (let i = 0; i < columns; i++) {
    columnHeaders.push(data[0].months[i].name);
  }

  const rowHeaders = [];
  for (let i = 0; i < rows; i++) {
    rowHeaders.push(data[i].store.name);
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {columnHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th className="sum">Total</th>
        </tr>
      </thead>
      <tbody>
        {rowHeaders.map((header, rowIndex) => (
          <tr key={rowIndex}>
            <th>{header}</th>
            {inputs[rowIndex].map((value, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    handleInputChange(event, rowIndex, colIndex)
                  }
                />
              </td>
            ))}
            <td className="sum">{rowSums[rowIndex]}</td>
          </tr>
        ))}
        <tr>
          <th className="sum">Total</th>
          {columnSums.map((sum, index) => (
            <td className="sum" key={index}>
              {sum}
            </td>
          ))}
          <td className="sum total-sum">{totalSum}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
