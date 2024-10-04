import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";

import styles from "./search.module.css";

function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const handleSearch = (val: string) => {
    setSearchValue(val);
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
            type="email"
            placeholder="search For Post"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button className={styles.buttonSearch} onClick={handleClickSearch}>
            Search
          </Button>
        </Form.Group>
      </Container>
    </Form>
  );
}

export default Search;
