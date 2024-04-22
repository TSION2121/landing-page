import {Route, Routes} from "react-router-dom";
import {FileUpload} from "@mui/icons-material";
import MainPage from "./pages/Admin/Main";

const  AdminRoutes = () => {
    return (
        <Routes>

            <Route path="/file" element={<FileUpload />} />
            <Route path="/analysis" element={<MainPage />} />
            {/* ... other admin routes */}
        </Routes>
    );
}

    export default AdminRoutes;