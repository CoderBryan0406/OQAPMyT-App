import { MainPage } from './pages/MainPage'
import { BuyNow } from './pages/BuyNow'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TravelQuoteForm from './pages/TravelQuoteForm'
import TravelPlans from './components/TravelPlans'
import { GlobalDataProvider } from './contexts/globalData'

function App() {

  return (
    <>
       {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}

      <GlobalDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TravelQuoteForm />} />
            <Route path="/plans" element={<TravelPlans />}/>
          </Routes>
        </Router>
      </GlobalDataProvider>
    </>
  )
}

export default App
