import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { search } from "../BooksAPI";
import BookCard from "./BookCard";

export default function Search() {
  const navigate = useNavigate();
  const [searchResults, getSearchResults] = useState([]);

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
              : search(e.target.value).then((res) => {
                  console.log(res);
                  getSearchResults(res);
                })
          }
        />
      </div>
      {searchResults.length > 0 && (
        <Container>
          <Row>
            {searchResults.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                state={searchResults}
                index={index}
                updateState={getSearchResults}
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}
