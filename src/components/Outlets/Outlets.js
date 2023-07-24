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
      const response = await axios.get("/organization/all");
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
          {/* <Button primary className="add-org-button">
            Create
          </Button> */}
          <Button primary className="add-org-button"
      color='teal'
      content='Add Outlet'
      icon='add'
      labelPosition='left'
    />
        </Link>
      </div>

      {/* Organization Cards */}
      <div className="custom-card-container">
        {filteredOrganizations.map((org, index) => (
          <div key={index} className="ui card custom-card">
            <div className="image">
              <img src={org.display_logo} alt="Organization Logo" />
            </div>
            <div className="content">
              <a className="header">{org.name}</a>
              <div className="description">
                City : {org.city}
              </div>
              <div className="description">
               Area : {org.area}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outlets;
