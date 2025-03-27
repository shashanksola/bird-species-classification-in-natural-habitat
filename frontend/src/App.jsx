import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Location from "./components/Location/App"
const router = createBrowserRouter([{
  path: '/',
  element:
 <Home />
 
  
 
},{
  path:"/location",
  element:<Location/>
}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;