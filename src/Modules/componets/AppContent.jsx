import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import Players from './../fragments/players'
import Player from './../fragments/player'

import Leagues from './../fragments/leagues';
import AddLeague from '../fragments/add_league';
import League from './../fragments/league';
import EditLeague from './../fragments/edit_league'
import DelLeague from '../fragments/del_league'


import Payments from './../fragments/payments';
import Games from './../fragments/games';
import AddCoupon from './../fragments/add_coupon'
import EditCoupon from './../fragments/edit_coupon'
import Banner from './../fragments/banner';
import AddBanner from './../fragments/add_banner'
import EditBanner from './../fragments/edit_banner'
import AddGame from './../fragments/add_game'
// import FormTemplate from './../fragments/form_templates'
import MyProfile from './../fragments/my_profile'




import Home from './../fragments/home'

export const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
      {/* icon: <CIcon name="cil-user" customClasses="nav-icon" />, */}

        
        <Switch>
                <Route exact path='/players' 
                  name='Players'
                  render={(props) => (
                  <Players/>
                  )}
                />
                <Route path='/players/:id' 
                  name='Players'
                  render={(props) => (
                    <Player {...props}/>
                  )}
                />

              <Route exact path='/leagues' 
                  name='leagues'
                  render={(props) => (
                    <Leagues/>
                  )}
                />
                <Route path='/add_league' 
                  name='Add League'
                  render={(props) => (
                    <AddLeague {...props}/>
                  )}
                />
                <Route path='/edit_league/:id' 
                  name='edit League'
                  render={(props) => (
                    <EditLeague {...props}/>
                  )}
                />
                <Route path='/del_league' 
                  name='del League'
                  render={(props) => (
                    <DelLeague {...props}/>
                  )}
                />
                <Route path='/league/:id' 
                  name='League'
                  render={(props) => (
                    <League {...props}/>
                  )}
                />

                <Route path='/games' 
                  name='Games'
                  render={(props) => (
                    <Games {...props}/>
                  )}
                />
                <Route path='/add_coupon' 
                  name='Add Coupon'
                  render={(props) => (
                    <AddCoupon {...props}/>
                  )}
                />
                 <Route path='/edit_coupon' 
                  name='Edit Coupon'
                  render={(props) => (
                    <EditCoupon {...props}/>
                  )}
                />
              <Route exact path='/payments' 
                  name='Payments'
                  render={(props) => (
                    <Payments/>
                  )}
                />
                 <Route exact path='/banner' 
                  name='Advertisement'
                  render={(props) => (
                    <Banner/>
                  )}
                />
                 <Route exact path='/add_banner' 
                  name='AddBanner'
                  render={(props) => (
                    <AddBanner/>
                  )}
                />
                  <Route exact path='/edit_banner' 
                  name='EditBanner'
                  render={(props) => (
                    <EditBanner/>
                  )}
                />
              <Route exact path='/add_game' 
                  name='Add Game'
                  render={(props) => (
                    <AddGame/>
                  )}
                />

              {/* <Route exact path='/forms' 
                  name='FormTemplates'
                  render={(props) => (
                    <FormTemplate/>
                  )}
                /> */}

                <Route exact path='/profile' 
                  name='admin profile'
                  render={(props) => (
                    <MyProfile/>
                  )}
                />

                <Route
                  path='/'
                  name='Home'
                  render={(props) => (
                    <Home/>
                  )}
                />


          <Redirect from="/" to="/player" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

