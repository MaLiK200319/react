import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import Home from './pages/Home';
import AdminLayout from './admin/layouts/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProjectsEditor from './admin/pages/ProjectsEditor';
import SkillsEditor from './admin/pages/SkillsEditor';
import ProfileEditor from './admin/pages/ProfileEditor';
import ExperienceEditor from './admin/pages/ExperienceEditor';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="skills" element={<SkillsEditor />} />
              <Route path="profile" element={<ProfileEditor />} />
              <Route path="experience" element={<ExperienceEditor />} />
            </Route>

          </Routes>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
