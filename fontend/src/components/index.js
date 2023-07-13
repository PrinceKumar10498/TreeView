import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tree from './Tree';

const IndeterminateCheckbox = () => {
  const [checked, setChecked] = React.useState([false, false, false, false, false, false, false]);
  const [dataTree, setDataTree] = React.useState(null);

  // React.useEffect(() => {
  //   console.log(checked);
  // }, checked);

  React.useEffect(() => {
    fetch("http://localhost:4000/getTreeViewData",{
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
  },[]);

  const checkHandler = (event, fromWhichNode) => {
    if (fromWhichNode === "allTimeParent") {
      setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
    } else if (fromWhichNode === "secondLevelParent") {
      setChecked([false, event.target.checked, event.target.checked, event.target.checked, false, false, false]);
    } else if (fromWhichNode === "thirdLevelParent") {
      setChecked([false, false, event.target.checked, event.target.checked, false, false, false]);
    } else if (fromWhichNode === "childNode") {
      setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked, false, false, false]);
    } else if (fromWhichNode === "fourthLevelParent") {
      setChecked([false, false, false, false, event.target.checked, event.target.checked, event.target.checked]);
    } else if (fromWhichNode === "childNode1") {
      setChecked([false, false, false, false, false, event.target.checked, false]);
    } else if (fromWhichNode === "childNode2") {
      setChecked([false, false, false, false, false, false, event.target.checked]);
    }
  }

  const children1 = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 9 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[3]} onChange={(e) => checkHandler(e, "childNode")} />}
      />
    </Box>
  );

  const children2 = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 6 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[5]} onChange={(e) => checkHandler(e, "childNode1")} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[6]} onChange={(e) => checkHandler(e, "childNode2")} />}
      />
    </Box>
  );

  return (
    <div className="page-container">
      <div className="display-buttons">
        <Button variant="text">Select All</Button>
        <Button variant="text">Unselect All</Button>
      </div>
      {dataTree && <Tree data={dataTree}/>}
      {/* <FormControlLabel
        label="Parent1"
        control={
          <Checkbox
            checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]}
            indeterminate={checked[0] !== checked[1] !== checked[2] !== checked[3] !== checked[4] !== checked[5]}
            onChange={(e) => checkHandler(e, "allTimeParent")}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
          label="Parent2"
          control={
            <Checkbox
              checked={checked[1] && checked[2] && checked[3]}
              indeterminate={checked[1] !== checked[2] !== checked[3]}
              onChange={(e) => checkHandler(e, "secondLevelParent")}
            />
          }
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 6 }}>
        <FormControlLabel
          label="Parent3"
          control={
            <Checkbox
              checked={checked[2] && checked[3]}
              indeterminate={checked[2] !== checked[3]}
              onChange={(e) => checkHandler(e, "thirdLevelParent")}
            />
          }
        />
      </Box>
      {children1}
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
          label="Parent2"
          control={
            <Checkbox
              checked={checked[4] && checked[5] && checked[6]}
              indeterminate={checked[4] !== checked[5] !== checked[6]}
              onChange={(e) => checkHandler(e, "fourthLevelParent")}
            />
          }
        />
      </Box>
      {children2} */}
    </div>
  );
}

export default IndeterminateCheckbox;