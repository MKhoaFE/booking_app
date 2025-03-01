import React from "react";
import { AppBar, Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
function Header({ title, subtitle, btn }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="0.1rem" sz={{flexGrow: 1}}>
      <AppBar position="static" style={{background:"none"}}>
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h2"
            fontWeight="bold !important"
            color={colors.grey[100]}
            sx={{ mb: "0.2rem" }}
          >
            {title}
          </Typography>
          <Typography variant="h6" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </Typography>
        {btn && <Button variant="contained" color="inherit">{btn}</Button>}
        </Toolbar>

      </AppBar>
      
    </Box>
  );
}

export default Header;
