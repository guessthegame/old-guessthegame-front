import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout/Layout'
import LoginPage from '../components/pages/login/Signin/Signin.connect'

const Signin: NextPage = () => (
  <Layout>
    <LoginPage />
  </Layout>
)

export default Signin
