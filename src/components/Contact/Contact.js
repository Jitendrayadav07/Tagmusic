import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from 'semantic-ui-react';
import SongCards from '../Card/Card';
import "./Contact.css"

const App = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/v1/category/search?q=${searchQuery}&type=track&include_external=audio`);
      console.log("response", response);
      const songsData = response.data.result.songs;
      setSongs(songsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchSongs();
  };

  const handleInputChange = (event, { value }) => {
    setSearchQuery(value);
  };

  return (
    <div className="page-container">
    <h1>Hello Organization</h1>
      {/* Search Bar */}
      <div className="filter-container">
        <Input
          icon="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button fluid primary onClick={handleSearch} >Search</Button>
        </div>
      <SongCards songs={songs} />
    </div>
  );
};

export default App;