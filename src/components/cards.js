import React from 'react';
import { Card, Button } from 'react-bootstrap';
function cards({ id, detail, adminName, editMovie }) {
    return (
        <div>
            <Card key={id}
                text={"Info".toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '18rem', backgroundColor: "#bbf2e6" }}
                className="mb-2" >
                <Card.Header style={{ color: "#000", display: "flex", justifyContent: 'space-around' }}>
                    <Card.Title>{detail.name}</Card.Title>
                    {adminName ? <Button onClick={e => editMovie(id, detail)}>edit</Button> : <span></span>}</Card.Header>
                <Card.Body style={{ color: "#000" }}>
                    <Card.Title>{detail.director}</Card.Title>
                    <Card.Text>
                        {(detail.genre).toString()}
                    </Card.Text>
                    <Card.Text>
                        IMBD Score : {detail.imdb_score}
                    </Card.Text>
                    <Card.Text >
                        99popularity : {detail["99popularity"]}
                    </Card.Text>
                    <Card.Text >
                        Updated BY : {detail.updatedBy}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div >
    );
}

export default cards;
