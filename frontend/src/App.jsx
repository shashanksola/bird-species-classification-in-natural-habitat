import Home from './components/Home';
import FindBird from './components/FindBird';
import ClassifyBird from './components/ClassifyBird';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;