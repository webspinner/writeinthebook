import React, {Component} from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: null,
            logging_in: false,
            forgot_password: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.login = this.login.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
    }

    componentDidMount() {
        fetch("/api/session").then(r => r.json()).then(resp => {
            console.log(resp)
        })
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    login(event) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((resp) => {
            return resp.json()
        }).then((json) => {
            console.log(json)
        })
    }

    resetPassword(event) {
        console.log(this.state)
        fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((resp) => {
            return resp.json()
        }).then((json) => {
            console.log(json)
        })
    }

    render () {
        const {
            email,
            username,
            password,
            user_id, 
            logging_in, 
            forgot_password
        } = this.state

        if (user_id) {
            return (<div>Logged In</div>)
        } else {
            if (!logging_in) {
                return (<div onClick={() => this.setState({logging_in: true})}>Login</div>)
            } else if (!forgot_password) {
                return (<div>
                    <form action="/api/login" method="post">
                        <div>Email: <input type="text" name="email"/></div>
                        <div>Password: <input type="password" name="password"/></div>
                        <button type="submit">Login</button>
                        <div onClick={() => this.setState({register: true})}>register</div>
                        <div onClick={() => this.setState({forgot_password: true})}>forgot password</div>
                    </form>
                </div>)
            } else {
                return (<div>
                    Email Address: <input type="email" value={email} onChange={this.handleEmailChange} />
                    <button onClick={this.resetPassword}>Reset</button>
                </div>)
            }
        }
    }
}