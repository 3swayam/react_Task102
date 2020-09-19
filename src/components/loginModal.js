import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
function loginModal({ displayModal, closeLoginModal }) {
    return (
        <div>
            <Modal show={displayModal} onHide={closeLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>


                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeLoginModal}>
                        Close
          </Button>
                    <Button variant="primary" onClick={closeLoginModal}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default loginModal;
