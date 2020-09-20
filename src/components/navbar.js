import React from 'react';
import { Navbar, Form, InputGroup, Button } from 'react-bootstrap';
function navbar({ showLoginModal, admin, signout, displayName }) {
    return (
        <div>
            <Navbar className="bg-light justify-content-between">
                <Form inline>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Movie Mania </InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form>
                <Form inline>
                    {admin ? <div><p>Welcome {displayName}</p><Button type="submit" onClick={signout}>Signout</Button></div> :
                        <Button type="submit" onClick={showLoginModal}>Admin Login</Button>}
                </Form>
            </Navbar>
        </div>
    );
}

export default navbar;

