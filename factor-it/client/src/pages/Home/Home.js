import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import LoginForm from "../../components/LoginForm"

class Home extends Component {
    state = {}
    render() {
        return (
            <Container fluid>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
                    <div className="navbar-header">
                        <h1><a className="navbar-brand" href="/">factor.it</a></h1>
                    </div>
                    <ul className="nav navbar-nav ml-auto">
                    </ul>
                </nav>
                <Row clName="justify-content-center">
                    <Col size="10 md-6">
                        <LoginForm type="login"></LoginForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home;