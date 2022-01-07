import React from 'react';
import { Link } from 'react-router-dom';

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export const ResetPassword = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Enter your email to receive verification code.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl placeholder="Email Id" type="email" autoComplete="username" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                          <Link to="/login" style={{"float":"left"}}>
                            <CButton color="black" >
                                Go back to <b>login</b>
                            </CButton>
                          </Link>
                      </CCol>
                      <CCol xs="6">
                        <Link to="/">
                          <CButton color="dark" style={{"float":"right"}}>
                              Reset Password
                          </CButton>
                        </Link>
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