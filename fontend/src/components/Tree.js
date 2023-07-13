import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Tree = ({ data }) => {
    return (
        <ul style={{listStyleType: "none"}}>
            {data && data.map((item, key) => (
                <li key={key}>
                    <FormControlLabel control={<Checkbox />} label={item.title} />
                    {item.childNodes && <Tree data={item.childNodes} />}
                </li>
            ))}
        </ul>
    )
};

export default Tree;