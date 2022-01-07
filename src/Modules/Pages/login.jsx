import React from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {api_url} from '../../config'

// let base_url = 'http://52.66.82.72:3000/api/';
const axios = require('axios').default;


export const Login = () => {

  const login_request = () =>
  {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    //console.log(username, password);
    let error = 0;
    if (username === '' ){
      document.getElementById('username').style.border = '2px solid red';
      error = 1;
    }
    if(password === ''){
      document.getElementById('password').style.border = '2px solid red';
      error = 1;
    }
    if (error === 0){
    axios({
      method: 'post',
      url: api_url+'admin/login',
      data: {
        username: username,
        password: password
      }
      
    }).then(function (response) {
      if (response.status === 200){
        // console.log(response);
        localStorage.setItem('token',response.data.access_token)
        window.location.href = "/#/otp";
        window.location.reload();      
      }
      else{
      }
    
    }).catch(function(error){
      document.getElementById('form-error').style.display='block';
      document.getElementById('form-error').innerHTML=error.response.data;
    });
  }
  }
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl placeholder="Username" type="text" id='username' autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        id='password'
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                    <CCol xs="12 pt-2">
                        <CAlert color="danger" id='form-error' style={{'display':'none'}}></CAlert>
                      </CCol>

                      <CCol xs="6">
                          <Link to="/reset_password">
                            <CButton color="black" >
                                  reset <b>password</b>
                            </CButton>

                          </Link>
                      </CCol>
                      <CCol xs="6">
                          <CButton color="dark" style={{"float":"right"}} onClick={login_request}>
                              Login
                          </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}