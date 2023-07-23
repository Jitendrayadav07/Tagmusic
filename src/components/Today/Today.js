import React, { useState } from "react";
import axios from "axios";
import { Header, Segment, Button, Form, Card, Icon } from "semantic-ui-react";

const Today = () => {
  const [showForm, setShowForm] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [pricePerRequest, setPricePerRequest] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleActivateTodayClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setShowCard(true);

    setArtistName("");
    setGenre("");
    setPricePerRequest(0);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: "30px" }}>
        Welcome to TagMusic!
      </Header>

      {showForm ? (
        <Segment textAlign="left">
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <label>Artist Name</label>
              <input
                placeholder="Artist Name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Genre</label>
              <input
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Price Per Request</label>
              <input
                type="number"
                placeholder="Price Per Request"
                value={pricePerRequest}
                onChange={(e) => setPricePerRequest(e.target.value)}
              />
            </Form.Field>
            <Button primary type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      ) : (
        <Button primary onClick={handleActivateTodayClick}>
          Activate Today
        </Button>
      )}

      {showCard && (
        <Card>
          <Card.Content>
            <Card.Header>{artistName}</Card.Header>
            <Card.Meta>{genre}</Card.Meta>
            <Card.Description>Price Per Request: {pricePerRequest}</Card.Description>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default Today;
