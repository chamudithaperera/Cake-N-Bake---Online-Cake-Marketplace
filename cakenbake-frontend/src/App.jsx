import { ThemeProvider } from '@emotion/react'
import './styles/theme.css'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './component/State/Authentication/Action'
import { findCart } from './component/State/Cart/Action'
import { getAllEvents, getAllFoods, getAllRestaurantAction, getRestaurantByUserId } from './component/State/Restaurant/Action'
import Routers from './Routers/Routers'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b6b',
    },
    secondary: {
      main: '#fd79a8',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3436',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        },
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
    dispatch(findCart(jwt));
    dispatch(getAllEvents(auth.jwt || jwt));
    dispatch(getAllRestaurantAction());
    dispatch(getAllFoods());
  }, [auth.jwt, jwt])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  )
}

export default App
