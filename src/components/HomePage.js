import React, { useState, useEffect, useMemo } from "react";
import { Search } from "@mui/icons-material";
import Pagination from "./Pagination";
import TableRow from "./Table";
import { orders } from "../orders";
import "./HomePage.css"
import { useNavigate } from "react-router-dom";
import {
    Grid,
    InputAdornment,
    TextField,
    Box,
    Stack,
    Chip,
} from "@mui/material";

const PageSize = 10;

const LandingPage = () => {
    const navigate = useNavigate();
    const [ordersData, setOrdersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        performApiCall();
    }, []);

    async function performApiCall() {
        try {
            const response = await orders;
            const username = localStorage.getItem("username");
            if (!username) {
                navigate("/login");
            }
            setOrdersData(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
        }
    }


    const filteredData = useMemo(() => {
        if (searchTerm.length > 0) {
            return ordersData.filter(
                (item) =>
                    item.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.pickup_date?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return ordersData;
    }, [ordersData, searchTerm]);


    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Box sx={{ background: "#ffff", padding: "20px" }}>

            <Box className="searchBar" sx={{ padding: "0 20px" }}>
  <TextField
    className="search-desktop"
    size="small"
    fullWidth
    InputProps={{
      className: "search",
      sx: { borderRadius: "25px" }, // Add this line to make the TextField rounded
      endAdornment: (
        <InputAdornment position="end">
          <Search color="primary" />
        </InputAdornment>
      ),
    }}
    placeholder="Search by Order-Id, Vendors name, Date or Status"
    name="search"
    value={searchTerm}
    onChange={handleChangeSearch}
  />
</Box>
                <Box sx={{ padding: "0.20px", overflow: "hidden" }}>
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100vw",
                        }}
                    >
                        <Chip
                            label={"Order Id"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "900",
                                background: "none",
                                width: "30vw",
                                justifyContent: "flex-center",
                            }}
                        />
                        <Chip
                            label={"Vendors Name"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "900",
                                background: "none",
                                width: "30vw",
                                justifyContent: "flex-center",
                            }}
                        />
                        <Chip
                            label={"Date"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "900",
                                background: "none",
                                width: "30vw",
                                justifyContent: "flex-center",
                            }}
                        />
                        <Chip
                            label={"Status"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "900",
                                background: "none",
                                width: "30vw",
                                justifyContent: "flex-center",
                            }}
                        />


                    </Stack>
                    <hr
                        style={{ width: "100vw", background: "rgba(216, 216, 216, 0.5)" }}
                    />
                    <Box>
                        <Grid
                            container
                            direction="row"
                            spacing={{ xs: 1, md: 2 }}
                            className="usersTable"
                        >
                            {filteredData
                                .slice(
                                    currentPage * PageSize - PageSize,
                                    currentPage * PageSize
                                )
                                .map((item) => {
                                    return (
                                        <Grid item key={item.order_id}>
                                            <TableRow data={item} />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: "0",
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "25%",
                        background: "#ffff",
                    }}
                >
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredData.length}
                        pageSize={PageSize}
                        onPageChange={handlePageChange}
                    />
                </Box>
            </Box>

        </>

    )
};

export default LandingPage;
