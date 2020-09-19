import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
function loginModal({ displayModal, closeLoginModal,
    email, handleEmailChange, password, handlePasswordChange, login }) {

    return (
        <div>
            <Modal show={displayModal} onHide={closeLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" maxLength={30} placeholder="Enter email" value={email} onChange={e => handleEmailChange(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password (Max 10 characters)</Form.Label>
                        <Form.Control type="password" placeholder="Password" maxLength={10}
                            value={password} onChange={e => handlePasswordChange(e.target.value)} />
                    </Form.Group>


                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeLoginModal}>
                        Close
          </Button>
                    <Button variant="primary" onClick={login}>
                        Login
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default loginModal = React.memo(loginModal);
