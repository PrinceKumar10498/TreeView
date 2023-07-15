import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const TreeView = ({ data, ...props }) => {

    // counting number of nodes attached 
    const countNumberOfDirectChild = (item) => {
        if(item.childNodes && item.childNodes.length > 0) {
            return item.childNodes.length;
        } else {
            return 0;
        }
    }
    
    return (
        <ul style={{listStyleType: "none"}}>
            {data && data.map((item, key) => (
                <li key={key}>
                    <FormControlLabel control={<Checkbox checked={item.checked} onChange={(e) => props.onChangeHandler(e, item, item.id)}/>} label={item.title + ": (" + countNumberOfDirectChild(item) + ")"} />
                    {item.childNodes && <TreeView data={item.childNodes} onChangeHandler={props.onChangeHandler}/>}
                </li>
            ))}
        </ul>
    )
};

export default TreeView;