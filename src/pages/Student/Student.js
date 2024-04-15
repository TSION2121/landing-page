import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Task from "./scenes/task";
import Notifications from "./scenes/notifications";
import Messages from "./scenes/messages";
import Reports from "./scenes/report";
import Calendar from "./scenes/calendar";
import Accounts from "./scenes/account";
import Settings from "./scenes/setting";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function Student() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/student" element={<Dashboard />} />
              <Route path="/student/task" element={<Task />} />
              <Route path="/student/messages" element={<Messages />} />
              <Route path="/student/notifications" element={<Notifications />} />
              <Route path="/student/report" element={<Reports />} />
              <Route path="/student/calendar" element={<Calendar/>}/>
              <Route path="/student/account" element={<Accounts/>}/>
              <Route path="/student/setting" element={<Settings/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Student;
