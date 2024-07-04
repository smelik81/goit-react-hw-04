import { useState } from "react";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  return (
    <header>
      <form>
        <input
          className={css.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={query}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
