import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { search, getAll } from "../BooksAPI";
import BookCard from "./BookCard";

export default function Search() {
  const navigate = useNavigate();
  const [searchResults, getSearchResults] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    books.length === 0 && getAll().then((res) => setBooks(res));
  });

  return (
    <Container className="my-3">
      <Button
        variant="success"
        className="mx-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Close
      </Button>
      <div className="m-3">
        <input
          type="text"
          placeholder="Search by title or author"
          className="form-control"
          onChange={(e) =>
            e.target.value === ""
              ? getSearchResults([])
              : search(e.target.value).then((res) => getSearchResults(res))
          }
        />
      </div>
      {searchResults.length > 0 && (
        <Container>
          <Row>
            {searchResults.map((book, index) => (
              <BookCard
                key={index}
                books={books}
                book={book}
                state={searchResults}
                updateState={getSearchResults}
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}
