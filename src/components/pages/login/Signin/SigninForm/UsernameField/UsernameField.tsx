import React from 'react'
import debounce from 'awesome-debounce-promise'
import Input from '../../../../../form/Input/Input'
import { checkUsernameAvailabilty } from '../../../../../../services/api/user/signin'

interface Props {
  handleChange: (value: string, valid: boolean) => void
}

interface State {
  value: string
  status: 'untouched' | 'success' | 'error'
  message?: string
}

class UsernameField extends React.Component<Props, State> {
  readonly state: State = {
    value: '',
    status: 'untouched',
  }

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({ value })

    const newState = await this.checkUsername(value)
    this.setState(newState, () => {
      this.props.handleChange(value, newState.status === 'success')
    })
  }

  checkUsername = debounce(async (value: string): Promise<State> => {
    if (!value || value.length < 2) {
      return {
        value,
        status: 'error',
        message: 'Le pseudo doit avoir au minimum 2 lettres.',
      }
    }
    if (value.length > 20) {
      return {
        value,
        status: 'error',
        message: 'Trop long ! Maximum 20 lettres.',
      }
    }
    const isFree = await checkUsernameAvailabilty(value)
    if (!isFree) {
      return {
        value,
        status: 'error',
        message: "Nom d'une pipe ! Ce pseudo est déjà pris.",
      }
    }
    return {
      value,
      status: 'success',
      message: 'Ce pseudo est dispo ! Nice',
    }
  }, 200)

  render() {
    const { value, status, message } = this.state
    return (
      <Input
        id="username"
        label="Pseudo"
        placeholder="Ex: reblochon74"
        type="text"
        value={value}
        messageTxt={message}
        messageType={status}
        onChange={this.handleChange}
      />
    )
  }
}
export default UsernameField
