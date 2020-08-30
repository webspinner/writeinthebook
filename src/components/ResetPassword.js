import React, { Component } from 'react';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {showForm: false, message: "Checking Token."}
        this.resetPassword = this.resetPassword.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onConfirmChange = this.onConfirmChange.bind(this)
    }

    componentDidMount() {
        console.log('getting token data', this)
        fetch(`/api/reset-password${window.location.search}`).then((record) => {
            return record.json()
        }).then((json) => {
            this.setState({...json, showForm: json.showForm})
        })
    }

    isValidPassword(password) {
      const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/
      return password.match(valid)
    }

    onPasswordChange({target}) {
        const {value} = target
        const [status, message] = this.isValidPassword(value) ? ['ok', 'Valid Password'] : ['error', 'Invalid Password']
        this.setState({
            password: value,
            status,
            message
        })
    }

    onConfirmChange({target}) {
        this.setState({
            confirm: target.value
        })
    }

    resetPassword() {
        const {password, confirm, token, email} = this.state
        if (password !== confirm) {
            return this.setState({
                status: 'error',
                message: "Passwords to not match."
            })
        }
        fetch('/api/reset-password', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                email,
                password,
                confirm
            })
        }).then((response) => {
            return response.json()
        }).then(({status, message}) => {
            this.setState({
                status,
                message
            })
        })
    }

    render() {
        const {showForm, status, message, email, token} = this.state
        if (showForm === false) {
            return (<div>{message}</div>)
        }
        return(
            <div>
                <div class="{status}">{message}</div>
                <div>New Password: <input type="password" onChange={this.onPasswordChange} className="newPassword"/></div>
                <div>Confirm: <input type="password" onChange={this.onConfirmChange} className="confirm"/></div>
                <button onClick={this.resetPassword}>Update Password</button>
            </div>
        )
    }
}