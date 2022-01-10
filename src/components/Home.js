import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import { getAll } from "../BooksAPI";
import BookCard from "./BookCard";

export default function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const shelves = [
    ["Currently Reading", "currentlyReading"],
    ["Want to Read", "wantToRead"],
    ["Read", "read"],
  ];

  useEffect(() => {
    books.length === 0 && getAll().then((res) => setBooks(res));
  });

  return (
    <Container className="text-center my-3">
      <h1 id="title" className="rounded p-3 m-3">
        My Reads
      </h1>
      {shelves.map((shelf, i) => (
        <section key={i} className="my-5">
          <h2 className="rounded p-3 m-3">{shelf[0]}</h2>
          <Container>
            <Row>
              {books.filter((book) => book.shelf === shelf[1]).length === 0 &&
              books.length !== 0 ? (
                <p className="text-center">No books available in this shelf</p>
              ) : (
                books
                  .filter((book) => book.shelf === shelf[1])
                  .map((book, index) => (
                    <BookCard
                      key={index}
                      book={book}
                      index={index}
                      state={books}
                      updateState={setBooks}
                    />
                  ))
              )}
            </Row>
          </Container>
        </section>
      ))}
      <div>
        <Button variant="success" onClick={() => navigate("/search")}>
          Add a book
        </Button>
      </div>
    </Container>
  );
}
