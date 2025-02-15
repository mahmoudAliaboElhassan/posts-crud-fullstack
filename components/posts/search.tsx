"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";
import styles from "./search.module.css";

interface Props {
  searchVal: string;
}

function Search({ searchVal }: Props) {
  const [searchValue, setSearchValue] = useState<string>(searchVal);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Capture the current input value
    setSearchValue(value);

     if (value === "") {
      router.push(`?pageNumber=1&searchText=${value}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClickSearch(); // Trigger search when "Enter" is pressed
    }
  };

  const handleClickSearch = () => {
    router.push(`?pageNumber=1&searchText=${searchValue}`);
  };

  return (
    <Form className={styles.formContainer}>
      <Container fluid="lg">
        <Form.Group
          className="mb-3 d-flex"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            className={styles.inputStyle}
            type="text"
            placeholder="Search for Post"
            value={searchValue}
            onChange={handleChange} // Track input changes
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          <Button className={styles.buttonSearch} onClick={handleClickSearch}>
            {/* Search Button SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ width: "30px", height: "100%" }}
            >
              <g fill="#FFFFFF">
                <path d="M22.1 20.1l-4.8-4.8C18.4 13.8 19 12 19 10c0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2 0 3.8-.6 5.3-1.7l4.8 4.8c.6.6 1.4.6 2 0 .5-.6.5-1.5 0-2zM10 16.5c-3.6 0-6.5-2.9-6.5-6.5S6.4 3.5 10 3.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z"></path>
              </g>
            </svg>
          </Button>
        </Form.Group>
      </Container>
    </Form>
  );
}

export default Search;
