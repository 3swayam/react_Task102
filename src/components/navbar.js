import React from 'react';
import { Navbar, Form, InputGroup, Button } from 'react-bootstrap';
function navbar({ displayModal, showLoginModal }) {
    return (
        <div>
            <Navbar className="bg-light justify-content-between">
                <Form inline>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Movie Mania {displayModal ? "true" : "false"}</InputGroup.Text>
                        </InputGroup.Prepend>

                    </InputGroup>
                </Form>
                <Form inline>
                    <Button type="submit" onClick={showLoginModal}>Admin Login</Button>
                </Form>
            </Navbar>
        </div>
    );
}

export default navbar;
