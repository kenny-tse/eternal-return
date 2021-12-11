import React from 'react';
import { Grid, Toolbar, Drawer, Button } from '@mui/material';
import { Link } from "react-router-dom";

const LinkDrawer = function (props) {

  return (
    <Drawer variant="permanent" anchor="top" sx={{ [`& .MuiDrawer-paper`]: { display: "flex", flexDirection: "row", justifyContent: "flex-end", boxSizing: 'border-box', backgroundSize: "cover", borderBottom: "2px solid black", flexShrink: 0, marginBottom: "10px" } }}>
      <Button id="linkDrawerButton" className="charactersButton" component={Link} to={"/Characters"}>
        Characters
      </Button>

      <Button id="linkDrawerButton" className="PlayerButton">
        Players
      </Button>
    </Drawer >

  );
}

export default LinkDrawer;