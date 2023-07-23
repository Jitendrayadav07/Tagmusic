import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Grid, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Outlets.css";

const Outlets = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllOrganization();
  }, []);

  const fetchAllOrganization = async () => {
    try {
      const response = await axios.get("/organization");
      const organizationData = response.data.result;
      setOrganizations(organizationData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event, { value }) => {
    setSearchQuery(value);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Hello Organization</h1>
      {/* Search Bar */}
      <div className="filter-container">
        <Input
          icon="search"
          placeholder="Search... by name"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {/* Add Org Button */}
      <div className="add-org-button-container">
        <Link to="addOrg">
          <Button primary className="add-org-button">
            Create
          </Button>
        </Link>
      </div>

      {/* Organization Cards */}
      <Grid columns={4} stackable doubling>
        {filteredOrganizations.map((org, index) => (
          <Grid.Column key={index}>
            <Card className="card">
              <Image className="img" src={org.display_logo} wrapped ui={false} />
              <Card.Content>
                <hr />
                <Card.Header>{org.name}</Card.Header>
                <Card.Meta>
                  <span className="city">
                    <b>City:</b> {org.city}
                  </span>
                  <br />
                  <span className="area">
                    <b>Area:</b> {org.area}
                  </span>
                  <br />
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Outlets;
