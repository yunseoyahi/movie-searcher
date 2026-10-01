import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './component/Header'
import Main from './pages/Main'
import Details from "./pages/Details"
import Search from "./pages/Search"
import Watchlist from "./pages/Watchlist"
import Footer from './component/Footer'
import { BookmarkProvider } from './context/BookmarkContext'


function App() {

  return (
    <BookmarkProvider>
      <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:id" element={<Details/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/watchlist" element={<Watchlist/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
    </BookmarkProvider>
  )
}

export default App
