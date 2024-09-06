import React, { useState } from 'react';

const TimeTable = () => {
  const initialTableData = [
    { id: 1, time: '09:00 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 2, time: '09:30 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 3, time: '10:00 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 4, time: '10:30 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 5, time: '10:30 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 6, time: '11:00 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 7, time: '11:30 AM', column1: '', column2: '', column3: '', column4: '' },
    { id: 8, time: '12:00 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 9, time: '12:30 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 10, time: '01:00 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 11, time: '01:30 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 12, time: '02:00 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 13, time: '02:30 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 14, time: '03:00 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 15, time: '03:30 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 16, time: '04:00 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 17, time: '04:30 PM', column1: '', column2: '', column3: '', column4: '' },
    { id: 18, time: '05:00 PM', column1: '', column2: '', column3: '', column4: '' },

  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [userInput, setUserInput] = useState({ rowId: '', column: '', data: '' });
  const [activeCell, setActiveCell] = useState({ rowId: null, column: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleUpdateTable = () => {
    const { rowId, column, data } = userInput;
  
    if (rowId < 1 || rowId > tableData.length) {
      alert('Please enter a valid row ID.');
      return;
    }
  
    if (!rowId || !column || !data) {
      alert('Please fill in all the fields before inserting data.');
      return;
    }
  
    const selectedRow = tableData.find((row) => row.id === parseInt(rowId));

    if (selectedRow[column]) {
      alert('This room is already booked. Please select another room.');
      return;
    }
  
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === parseInt(rowId) ? { ...row, [column]: data } : row
      )
    );
    setUserInput({ rowId: '', column: '', data: '' });
  };
  const handleClearTable = () => {
    const password = "java@123"
    let b = prompt("Enter Password");
    if (password === b ){
      setTableData(initialTableData);
    }
    else {
      alert("invalid password");
    }
  };

  const handleRemoveData = (rowId, column) => {
    const confirmRemoval = window.confirm(`Do you want to remove the data from ${column} in row ${rowId}?`);
    if (confirmRemoval) {
      const password = "java@123"
      let b = prompt("Enter Password")
      if(password === b ){
        setTableData((prevData) =>
          prevData.map((row) =>
            row.id === rowId ? { ...row, [column]: '' } : row
          )
        );
      }
      else {
        alert ("invalid password")
      }

    }
    setActiveCell({ rowId: null, column: null });
  };

  const handleDoubleClick = (rowId, column) => {
    const selectedRow = tableData.find((row) => row.id === rowId);
    
    if (selectedRow[column]) {
      setActiveCell({ rowId, column });
    } else {
      setActiveCell({ rowId: null, column: null });
    }
  };
  

  return (
    <div style={{margin:"20px"}}>
      <table border="1" style={{width:"96%" , marginBottom:"20px"}}>
        <thead>  
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Room 1</th>
            <th>Room 2</th>
            <th>Room 3</th>
            <th>Room 4</th> 
          </tr>
        </thead>
        <tbody >
          {tableData.map((row) => (
            <tr key={row.id}>
              <td style={{textAlign:"center"}}>{row.id}</td>
              <td style={{width:"100px"}}>{row.time}</td>
              <td onDoubleClick={() => handleDoubleClick(row.id, 'column1')}>
                {row.column1}
                {activeCell.rowId === row.id && activeCell.column === 'column1' && (
                  <button onClick={() => handleRemoveData(row.id, 'column1')}>Remove</button>
                )}
              </td>
              <td onDoubleClick={() => handleDoubleClick(row.id, 'column2')}>
                {row.column2}
                {activeCell.rowId === row.id && activeCell.column === 'column2' && (
                  <button onClick={() => handleRemoveData(row.id, 'column2')}>Remove</button>
                )}
              </td>
              <td onDoubleClick={() => handleDoubleClick(row.id, 'column3')}>
                {row.column3}
                {activeCell.rowId === row.id && activeCell.column === 'column3' && (
                  <button onClick={() => handleRemoveData(row.id, 'column3')}>Remove</button>
                )}
              </td>
              <td onDoubleClick={() => handleDoubleClick(row.id, 'column4')}>
                {row.column4}
                {activeCell.rowId === row.id && activeCell.column === 'column4' && (
                  <button onClick={() => handleRemoveData(row.id, 'column4')}>Remove</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      <input
        type="number"
        name="rowId"
        placeholder="Row ID"
        value={userInput.rowId}
        onChange={handleChange}
      /> 
      <select name="column" value={userInput.column} onChange={handleChange}>
        <option value="">Select Column</option>
        <option value="column1">Room 1</option>
        <option value="column2">Room 2</option>
        <option value="column3">Room 3</option>
        <option value="column4">Room 4</option>
      </select>
      <input
        type="text"
        name="data"
        placeholder="Enter Data"
        value={userInput.data}
        onChange={handleChange}
      />
      <button onClick={handleUpdateTable}>Insert Data</button>
       <button onClick={handleClearTable}>Clear Table</button> 
      </div>
  );
};

export default TimeTable;