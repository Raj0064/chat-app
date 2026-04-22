import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from "./pages/ProtectedRoutes";

export function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:
      <ProtectedRoute>
        <Home />
      </ProtectedRoute> 
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<SignUp/>
    }

   
  ]);

  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}
export default App;
