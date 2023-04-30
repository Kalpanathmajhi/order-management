import { SnackbarProvider } from "notistack";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/login";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <Login />
  
  }
 
]);
function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>

    </div>
  );
}

export default App;


