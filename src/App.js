import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from'./context/DataContext';

function App() {
  return <div className="App">
      <DataProvider>
        <Header title="ReactJS Blog" />
          <Router>
            <Nav />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/post" element={<NewPost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route exact path="/post/:id" element={<PostPage />} />
              <Route exact path="/about" element={<About />} />
              <Route path="*" element={<Missing />} />
            </Routes>
          </Router>
        <Footer />
      </DataProvider>
  </div>;
}

export default App;
