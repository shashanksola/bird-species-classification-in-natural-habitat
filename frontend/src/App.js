import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
}]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
