import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout/Layout'
import LoginPage from '../components/pages/login/Login/Login.connect'

const Login: NextPage = () => (
  <Layout>
    <LoginPage />
  </Layout>
)

export default Login
