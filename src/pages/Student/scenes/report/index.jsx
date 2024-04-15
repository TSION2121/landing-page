import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box m="20px">
      <Header
        title="Reports"
        subtitle=""
      />
      
       
    </Box>
  );
};

export default Reports;
