import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "black", // Set text color to white for all instances
          border: "1px solid blue ", // Default border for pagination items
          "&.Mui-selected": {
            backgroundColor: "gray", // Selected page color
            color: "white",
            border: "1px solid red #F93A44", // Red border for selected item
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#F93A44", // Keep selected page color on hover
            color: "white",
            border: "1px solid red", // Red border on hover for selected item
          },
          "&:hover": {
            backgroundColor: "#F93A44", // Hover color
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
