import React from 'react';
import { Nav } from 'react-bootstrap';
function sortbar({ sortBy, retriveMovies }) {
    function updateSort(event) {
        event.preventDefault();
    }
    return (
        <div>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item onClick={e => retriveMovies("name")}>
                    <Nav.Link className={sortBy == 'name' ? 'sort-by' : null}>Sort by Name</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={e => retriveMovies("director")}>
                    <Nav.Link className={sortBy == 'director' ? 'sort-by' : null}>Sort By director</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={e => retriveMovies("99popularity")}>
                    <Nav.Link className={sortBy == '99popularity' ? 'sort-by' : null}>Sort by Popularity</Nav.Link>
                </Nav.Item>
            </Nav>

        </div>
    );
}
export default sortbar = React.memo(sortbar);
