import { useState, useEffect } from "react";
import "./App.css";
import { fetchArticles } from "./api/articles-api";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const data = await fetchArticles("photos");
      setArticles(data);
    }

    getArticles();
  }, []);

  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default App;
