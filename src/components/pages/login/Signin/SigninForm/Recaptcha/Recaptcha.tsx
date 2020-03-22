import React from 'react'
// import ReCaptcha, { loadReCaptcha } from 'react-recaptcha-google'
// import ReCAPTCHA from 'react-recaptcha'
import ReCAPTCHA from 'react-google-recaptcha'

interface Props {
  handleChange: (token: string) => void
}

interface State {
  token: string
}

class Recaptcha extends React.Component<Props, State> {
  onChange = (token: string) => {
    this.setState({ token })
    this.props.handleChange(token)
  }

  onExpired = () => {
    this.setState({ token: null })
    this.props.handleChange(null)
  }

  render() {
    const recaptchaKey = process.env.RECAPTCHA_KEY
    return (
      <div style={{ marginTop: '2rem' }}>
        <ReCAPTCHA sitekey={recaptchaKey} onChange={this.onChange} onExpired={this.onExpired} />
      </div>
    )
  }
}
export default Recaptcha
