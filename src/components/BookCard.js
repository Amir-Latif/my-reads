import React from "react";
import { Card, Col } from "react-bootstrap";
import { update } from "../BooksAPI";

export default function BookCard({ book, index, state, updateState }) {
  return (
    <Col>
      <Card className="m-2">
        {book.imageLinks ? (
          <Card.Img variant="top" src={book.imageLinks.thumbnail} />
        ) : (
          <div style={{ flexBasis: "20rem" }}>[No thumbnail available]</div>
        )}
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          {book.authors ? (
            <Card.Text>
              {book.authors.map((author, ii) => (
                <span style={{ display: "block" }} key={ii}>
                  {author}
                </span>
              ))}
            </Card.Text>
          ) : (
            "[Authors are not available]"
          )}

          <select
            defaultValue={book.shelf}
            className="form-select"
            onChange={(e) => {
              let newBooks = [...state];
              newBooks.forEach((b) => {
                b.id === book.id && (b.shelf = e.target.value);
              });
              updateState([...newBooks]);
              update(book, e.target.value);
            }}
          >
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </Card.Body>
      </Card>
    </Col>
  );
}
