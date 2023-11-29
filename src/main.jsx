import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Traininglist from './components/traininglist.jsx'
import Customerlist from './components/customerlist.jsx'
import Home from './components/Home.jsx'
import Error from './components/Error.jsx'
import TrainingCalendar from './components/TrainingCalendar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "trainings",
        element: <Traininglist />
      },
      {
        path: "customers",
        element: <Customerlist />
      },
      {
        path: "calendar",
        element: <TrainingCalendar />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
