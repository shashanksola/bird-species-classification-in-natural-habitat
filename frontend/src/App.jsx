import Home from './components/Home';
import FindBird from './components/FindBird';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: 'Find-a-Bird',
  element: <FindBird />
}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;