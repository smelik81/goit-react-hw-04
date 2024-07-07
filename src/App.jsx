/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "./App.css";
import { fetchArticles } from "./api/articles-api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalLikes, setModalLikes] = useState("");

  useEffect(() => {
    if (!query) return;

    const getArticles = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await fetchArticles(query, page);
        if (results.length === 0 && page === 1) {
          toast.error("No results found. Please try a different search query.");
          setLoadMore(false);
          return;
        }
        if (results.length === 0) {
          toast.error("No results found. Please try a different search query.");
          setLoadMore(false);
          return;
        }

        setArticles((prevArticles) => [...prevArticles, ...results]);
        setLoadMore(page < total_pages);
        if (page > 1) {
          scroll.scrollToBottom();
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [query, page]);

  const onHandleSearchSubmit = async (searchQuery) => {
    setQuery(searchQuery);
    setArticles([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = ({ regular, alt_description, description, likes }) => {
    setModalImage(regular);
    setModalAlt(alt_description);
    setModalIsOpen(true);
    setModalDescription(description);
    setModalLikes(likes);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
    setModalAlt("");
  };

  console.log(articles);

  return (
    <div>
      <SearchBar onSubmit={onHandleSearchSubmit} />
      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery images={articles} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {loadMore && !isLoading && articles.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeModal={closeModal}
          imageUrl={modalImage}
          alt_description={modalAlt}
          description={modalDescription}
          likes={modalLikes}
        />
      )}
    </div>
  );
}

export default App;
