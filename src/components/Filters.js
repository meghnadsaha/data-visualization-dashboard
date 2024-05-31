import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const Filters = ({ filters, onFilterChange, uniqueValues }) => {
  return (
    <div className="my-4">
      <h4>Filters</h4>
      <Form>
        <Row className="align-items-end">
          {Object.keys(filters).map((key) => (
            <Col key={key} md={3}>
              <Form.Group controlId={`form${key}`}>
                <Form.Label>{key}</Form.Label>
                <Form.Select
                  name={key}
                  value={filters[key]}
                  onChange={onFilterChange}
                >
                  <option value="">Select {key}</option>
                  {uniqueValues[key] &&
                    uniqueValues[key].map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          ))}
          <Col md={3}>
            <Button variant="primary" type="submit" className="mt-3">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;
