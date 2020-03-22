import React from 'react'
import Input from '../../../../../form/Input/Input'

interface Props {
  handleChange: (value: string, valid: boolean) => void
}

interface State {
  password: {
    value: string
    status: 'untouched' | 'success' | 'error'
    message: string
  }
  confirmation: {
    value: string
    status: 'untouched' | 'success' | 'error'
    message: string
  }
}

class PasswordField extends React.Component<Props, State> {
  readonly state: State = {
    password: {
      value: '',
      status: 'untouched',
      message: '',
    },
    confirmation: {
      value: '',
      status: 'untouched',
      message: '',
    },
  }

  handleChange = () => {
    this.props.handleChange(
      this.state.password.value,
      this.state.password.status === 'success' && this.state.confirmation.status === 'success',
    )
  }

  handlePasswordChange = event => {
    const { value } = event.target
    this.setState(prevState => this.checkPassword(prevState, value), this.handleChange)
  }

  checkPassword = (prevState: State, value: string): State => {
    const state = {
      ...prevState,
      password: { ...prevState.password, value },
      confirmation: { ...prevState.confirmation },
    }
    if (!value) {
      state.password.status = 'error'
      state.password.message = 'Le mot de passe ne peut être vide.'
      return state
    }
    if (prevState.confirmation.value) {
      if (prevState.confirmation.value !== value) {
        state.password.status = 'error'
        state.password.message = 'Les mots de passes sont différents.'
        state.confirmation.status = 'error'
        state.confirmation.message = 'Les mots de passes sont différents.'
        return state
      }
      state.confirmation.status = 'success'
      state.confirmation.message = null
    }
    state.password.status = 'success'
    state.password.message = null

    return state
  }

  handleConfirmationChange = event => {
    const { value } = event.target
    this.setState(prevState => this.checkConfirmation(prevState, value), this.handleChange)
  }

  checkConfirmation = (prevState: State, value: string): State => {
    const state = {
      ...prevState,
      password: { ...prevState.password },
      confirmation: { ...prevState.confirmation, value },
    }

    if (prevState.password.value !== value) {
      state.confirmation.status = 'error'
      state.confirmation.message = 'Les mots de passe sont différents.'
      return state
    }
    if (prevState.password.value) {
      state.password.status = 'success'
      state.password.message = null
    }
    state.confirmation.status = 'success'
    state.confirmation.message = null

    return state
  }

  render() {
    const { password, confirmation } = this.state
    return [
      <Input
        id="password"
        type="password"
        key="password"
        label="Mot de passe"
        placeholder="Ex: ●●●●●●●●"
        value={password.value}
        messageTxt={password.message}
        messageType={password.status}
        onChange={this.handlePasswordChange}
      ></Input>,
      <Input
        id="confirmation"
        type="password"
        key="confirmation"
        label="Confirmation du mot de passe"
        placeholder="Ex: ●●●●●●●● (encore)"
        value={confirmation.value}
        messageTxt={confirmation.message}
        messageType={confirmation.status}
        onChange={this.handleConfirmationChange}
      ></Input>,
    ]
  }
}
export default PasswordField
