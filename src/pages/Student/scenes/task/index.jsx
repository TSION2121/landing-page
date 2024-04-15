import { Box, Paper} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";



const Task = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box m="20px">
      <Header
        title="Task Lists"
        subtitle=""
      />
 <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        {/* Content of the card */}
        Task 1
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        {/* Content of the card */}
        Task 2
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 5 }}>
        {/* Content of the card */}
        Task 3
      </Paper>
       
    </Box>
  );
};

export default Task;
