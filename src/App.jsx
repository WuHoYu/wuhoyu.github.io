
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import VisualLab from './pages/VisualLab';
import Cotton from './pages/Cotton';
import Stepstotheway from './pages/Stepstotheway';
import Hikvision from './pages/Hikvision';
import Laihua from './pages/Laihua';
import Lantern from './pages/lantern.jsx';
import EvolvingScripts from './pages/evolvingscripts.jsx';
import Hantype from './pages/hantype.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'visual-lab', element: <VisualLab /> },
      { path: 'cotton', element: <Cotton /> },
      { path: 'stepstotheway', element: <Stepstotheway /> },
      { path: 'hikvision', element: <Hikvision /> },
      { path: 'laihua', element: <Laihua /> },
      { path: 'lantern', element: <Lantern /> },
      { path: 'evolvingscripts', element: <EvolvingScripts /> },
      { path: 'hantype', element: <Hantype /> },
      
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
