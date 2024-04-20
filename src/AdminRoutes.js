import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./pages/stakes/src/routes/sections";
import UserPage from "./pages/stakes/src/pages/user";
import ProductsPage from "./pages/stakes/src/pages/products";
import BlogPage from "./pages/stakes/src/pages/blog";
import {FileUpload} from "@mui/icons-material";
import MainPage from "./pages/Admin/Main";

const  AdminRoutes = () => {
    return (
        <Routes>
            <Route path="new"  index element={<IndexPage/>}/>
            <Route path="user" element={<UserPage/>}/>
            <Route path="products" element={<ProductsPage/>}/>
            <Route path="blog" element={<BlogPage/>}/>
            <Route path="/file" element={<FileUpload />} />
            <Route path="/analysis" element={<MainPage />} />
            {/* ... other admin routes */}
        </Routes>
    );
}

    export default AdminRoutes;