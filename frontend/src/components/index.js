import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TreeView from './TreeView';

const IndeterminateCheckbox = () => {
  const [dataTree, setDataTree] = useState(null); 

  // fetch api for tree like JSON data
  useEffect(() => {
    fetch("http://localhost:4000/getTreeViewData", {
      "method": "GET"
    }).then((res) => {
      res.json().then((data) => {
        setDataTree(data);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  // select all and unselect all functionality
  const selectUnSelectToggle = (arr, validator, toggleCheck, id) => {
    const constId = id;
    let obj;
    let newArray = arr.map(i => {
        obj = {
          ...i,
          checked: validator === "select" ? true : false
        }
        if(i.childNodes && i.childNodes.length > 0) {
          obj.childNodes = selectUnSelectToggle(i.childNodes, validator === "select" ? "select" : "unSelect", id ? true : false, constId);
        }
        return obj;
    });
    if(toggleCheck) {
      let arr = [];
      if(id = 1) {
        arr.push(newArray[0], dataTree[1]);
      } else {
        arr.push(dataTree[0], newArray[1]);
      }
      console.log(arr);
    } else {
      setDataTree(newArray);
    }
    return newArray;
  }

  // node selection functionaltiy
  const onChangeHandler = (event, item, id) => {
      if(event.target.checked) {
        selectUnSelectToggle([dataTree[0]], "select", true, id);
      } else {
        selectUnSelectToggle([dataTree[0]], "unSelect", true, id);
      }
  } 

  return (
    <div className="page-container">
      <div className="display-buttons">
        <Button variant="text" onClick={() => selectUnSelectToggle(dataTree, "select", false)}>Select All</Button>
        <Button variant="text" onClick={() => selectUnSelectToggle(dataTree, "unSelect", false)}>Unselect All</Button>
      </div>
      {dataTree && <TreeView data={dataTree} onChangeHandler={onChangeHandler}/>}
    </div>
  );
}

export default IndeterminateCheckbox;