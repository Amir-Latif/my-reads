import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAll, update } from "../BooksAPI";

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
  }, []);

  return (
    <Container className="text-center">
      {console.log(books)}
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
                    <Col key={index} xs={4}>
                      <Card className="m-2">
                        <Card.Img
                          variant="top"
                          src={book.imageLinks.thumbnail}
                        />
                        <Card.Body>
                          <Card.Title>{book.title}</Card.Title>
                          <Card.Text>
                            {book.authors.map((author, ii) => (
                              <div key={ii}>{author}</div>
                            ))}
                          </Card.Text>
                          <select
                            defaultValue={book.shelf}
                            onChange={(e) => {
                              let newBooks = [...books];
                              newBooks[index].shelf = e.target.value;
                              setBooks([...newBooks]);
                              update(book, e.target.value);
                            }}
                          >
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </Card.Body>
                      </Card>
                    </Col>
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
