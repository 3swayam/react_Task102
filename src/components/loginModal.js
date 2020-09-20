import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { auth } from '../firebase';
function LoginModal({ displayModal, closeLoginModal }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(error.message);
            });
        setEmail('');
        setPassword('');
        closeLoginModal(false);
    }

    return (
        <div>
            <Modal show={displayModal} onHide={closeLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" maxLength={30} placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password (Max 10 characters)</Form.Label>
                        <Form.Control type="password" placeholder="Password" maxLength={10}
                            value={password} onChange={e => setPassword(e.target.value)} />
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
export default LoginModal;
