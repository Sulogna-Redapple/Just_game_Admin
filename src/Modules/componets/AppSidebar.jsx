import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'


const navigation = [  {
    _component: 'CNavTitle',
    anchor: 'Welcome Admin',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Home',
    to: '/home',
    icon: <CIcon name="cil-home" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'User Details',
    to: '/players',
    icon: <CIcon name="cil-user" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Battle',
    to: '/leagues',
    icon: <CIcon name="cil-settings" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'League',
    to: '/payments',
    icon: <CIcon name="cil-settings" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Coupon',
    to: '/games',
    icon: <CIcon name="cil-settings" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'In App Promo Banner',
    to: '/banner',
    icon: <CIcon name="cil-settings" customClasses="nav-icon" />,
  },
  // {
  //   _component: 'CNavItem',
  //   as: NavLink,
  //   anchor: 'Games',
  //   to: '/forms',
  //   icon: <CIcon name="cil-user" customClasses="nav-icon" />,
  // },
  // {
  //   _component: 'CNavItem',
  //   as: NavLink,
  //   anchor: 'Analytics',
  //   to: '/forms',
  //   icon: <CIcon name="cil-user" customClasses="nav-icon" />,
  // },



]
export const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)
    

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

