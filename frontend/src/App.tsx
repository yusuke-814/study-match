import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LikeProvider } from "./context/LikeContext";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";

function App() {
  return (
    <BrowserRouter>
      <LikeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/likes" element={<LikesPage />} />
        </Routes>
      </LikeProvider>
    </BrowserRouter>
  )
}

export default App;