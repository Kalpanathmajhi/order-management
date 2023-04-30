import {Box,Typography} from "@mui/material";
import  "./Header.css";
const Header=()=>{
 return (
    <Box className = "root">
        <Typography variant="h4" className="title">
        Order Management - Manage all Items and Orders
        </Typography>
    </Box>
 )
}
export default Header;
