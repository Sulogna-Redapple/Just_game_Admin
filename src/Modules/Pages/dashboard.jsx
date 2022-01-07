import React,{ useEffect} from 'react';
import {  AppHeader } from '../componets/AppHeader'
import {  AppFooter } from '../componets/AppFooter'
import { AppSidebar } from '../componets/AppSidebar'
import { AppContent} from '../componets/AppContent'

export const Dashboard = () => {
  useEffect(()=>{
    if(localStorage.getItem('token')==null){
      window.location.href='/#/login'
    }
  })
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}