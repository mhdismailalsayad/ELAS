import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSeleted] = useState("");
  let studyprograms
    const [test, setTest] = useState(() => {
        fetch("http://localhost:5000/studycompass/get_studyprograms")
        .then(response => response.json())
        .then(data =>  { studyprograms = data}).catch(error => {console.log(error)})

    });

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };

  const itemClicked = (event, value) => {setItemSeleted = value
console.log(itemSelected)}

  const handleClose = (ev) => {
    setAnchorEl(null);
    setItemSeleted(ev.target.innerText)
    console.log(ev.target.innerText)
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {itemSelected ? itemSelected : "open Menu"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        <MenuItem value="profile" onClick={handleClose}>Profile</MenuItem>
        <MenuItem  value="account" onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
