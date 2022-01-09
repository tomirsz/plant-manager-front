import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import logo from "../img/PlantManagerLogo.png";
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import '../App.css'


import AuthService from "../Services/AuthService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    currentUserLogged = () => {
        this.props.onLoginUser(true);
    }

    registerUser = () => {
        console.log("register")
        this.props.onUserRegister(true)
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.currentUserLogged();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <Paper className="paper">
                <div className="center">
                    <img
                        src={logo}
                        alt="logo-img"
                        className="logo-img-card"
                    />

                    <Form
                        className="center"
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}>
                        <div className="form-group">
                            <TextField
                                label="nazwa użytkownia"
                                variant="outlined"
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                variant="outlined"
                                label="hasło"
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group btnContainer">
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={this.state.loading}
                                type="submit"
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </Button>
                            <Button type={"button"}
                                    onClick={this.registerUser}
                                    variant="outlined"
                                    color="primary"
                            >
                                <span>Register</span>
                            </Button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </Paper>
        );
    }
}