import Customerlist from './components/customerlist'
import Traininglist from './components/traininglist';
import { AppBar, Typography } from "@mui/material";


function App() {

  return (
    <>
      <AppBar position='sticky'>
        <Typography variant='h6'>
          Personal trainer app
        </Typography>
      </AppBar>
      < Customerlist />
      < Traininglist />
    </>
  )
}

export default App
