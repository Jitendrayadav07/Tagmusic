import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const SongCards = ({ songs }) => {
  return (
    <div style={{ height: '100vh', overflow: 'auto',marginTop: '20px'}}>
      <Card.Group itemsPerRow={5}>
        {songs.map((song, index) => (
          <Card key={index}>
            <Image src={song.image_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{song.name}</Card.Header>
              <Card.Meta style={{ color: 'green' }}>{song.artistsName}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a href={song.song_url} target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
                Listen on Spotify
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default SongCards;