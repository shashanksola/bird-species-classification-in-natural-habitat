import Home from './components/Home';
import FindBird from './components/FindBird';
import ClassifyBird from './components/ClassifyBird';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: 'Find-a-Bird',
  element: <FindBird />
},
{
  path: 'Classify-Bird',
  element: <ClassifyBird />
}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;