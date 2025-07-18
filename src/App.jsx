import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./sections/Login/Login";
import Previous from "./sections/Previous/Previous";
import Home from "./sections/Home/Home";
import Body from "./sections/Body/Body";
import Community from "./sections/Community/Community";

const router = createBrowserRouter(
  [
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/new-design", element: <Body /> },
    { path: "/previous", element: <Previous /> },
    { path: "/community", element: <Community /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
