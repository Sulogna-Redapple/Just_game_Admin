import React from 'react'

// examples

const Leagues = React.lazy(() => import('./../src/Modules/fragments/leagues'))
const Add_League = React.lazy(() => import('./../src/Modules/fragments/add_league'))
const Add_Coupon = React.lazy(() => import('./../src/Modules/fragments/add_coupon'))
const Edit_Coupon = React.lazy(() => import('./../src/Modules/fragments/edit_coupon'))
const EditLeague = React.lazy(() => import('./../src/Modules/fragments/edit_league'))
const Del_League = React.lazy(() => import('./../src/Modules/fragments/del_league'))
const League = React.lazy(() => import('./../src/Modules/fragments/league'))
const Players = React.lazy(() => import('./../src/Modules/fragments/players'))
const Payments = React.lazy(() => import('./../src/Modules/fragments/payments'))
const Games = React.lazy(() => import('./../src/Modules/fragments/games'))
const Player = React.lazy(() => import('./../src/Modules/fragments/player'))
const Advertisement = React.lazy(() => import('./../src/Modules/fragments/banner'))

const AddBanner = React.lazy(() => import('./../src/Modules/fragments/add_banner'))
const EditBanner = React.lazy(() => import('./../src/Modules/fragments/edit_banner'))

const profile = React.lazy(() => import ('./../src/Modules/fragments/my_profile'))
const Prize = React.lazy(() => import('./../src/Modules/fragments/pot_dist'))
 const Login = React.lazy(() => import('./Modules/Pages/login'))
 const Otp = React.lazy(() => import('./Modules/Pages/otp'))
 const Dashboard = React.lazy(() => import('./Modules/Pages/dashboard'))

// const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))



const routes = [
  { path: '/add_league', name: 'Add New Battle', component: Add_League },
  { path: '/add_coupon', name: 'Add Coupon', component: Add_Coupon },
  { path: '/edit_coupon', name: 'Edit Coupon', component: Edit_Coupon },
  { path: '/edit_league', name: 'Edit League', component: EditLeague },
  { path: '/edit_battle', name: 'Edit Battle', component: EditLeague },
  { path: '/del_league', name: 'Add Leagues', component: Del_League },
  { path: '/league', name: 'Battle', component: League },  

  { path: '/leagues', name: 'Leagues', component: Leagues },
  { path: '/players/', name: 'Player', component: Player },
  { path: '/players', name: 'User Details', component: Players },
  { path: '/Prize', name: 'Prize', component: Prize },
  { path: '/payments', name: 'League', component: Payments },
  { path: '/games', name: 'Cupon', component: Games },  
  // { path: '/banner', name: 'Banner', component: Banner },  
  { path: '/profile', name: 'admin-profile',component:profile},
  { path: '/',name: 'Dashboard', exact: true, component: Login },
  { path: '/otp',name: 'Otp', exact: true, component: Otp },
  { path: '/dashboard',name: 'Dashboard', exact: true, component: Dashboard },
  { path: '/banner', name: 'Advertisement', component: Advertisement },
  { path: '/add_banner', name: 'AddBanner', component: AddBanner },
  { path: '/edit_banner', name: 'EditBanner', component: EditBanner },

]


export default routes
