import React,{useState} from 'react';
import DataTableBanner from '../componets/DataTableBanner'
import CIcon from '@coreui/icons-react'


import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  
  } from '@coreui/react'
  

const Banner = () => {
  const [activeKey, setActiveKey] = useState(1)
  let present_data = {
    "api_url":'admin/leagues?category=present&',
    "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
    "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['start_time','end_time'],
    "fetch_size":10,
    "table_name":"Active Banner",
    "show_filter":false,
    "show_export":false,
    "show_update":false,
    "show_delete":true,    
    "show_view":true,
    "add_url":"/#/add_banner"

  }
  
  

  

  let past_data  = {
    "api_url":'admin/leagues?category=past&',
    "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
    "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['start_time','end_time'],
    "fetch_size":10,
    "table_name":"Deactive Banner",
    "show_filter":false,
    "show_export":false,
    "show_view":true,
    "show_update":false,
    "show_delete":true, 
    "add_url":"/#/add_banner"
  }
  // let upcoming_data = {
  //   "api_url":'admin/leagues?category=upcoming&',
  //   "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
  //   "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
  //   "id_field":['id'],
  //   "view_url":"#/league/",
  //   "update_url":"",
  //   "datetimefields":['start_time','end_time'],
  //   "fetch_size":10,
  //   "table_name":"Upcoming Battle",
  //   "show_filter":false,
  //   "show_export":false,
  //   "show_update":true,
  //   "show_delete":true, 
  //   "show_view":true,
  //   "add_url":"/#/add_league",
  //   "icon":CIcon
  // }
  // let deactive_data = {
  //   "api_url":'admin/leagues?category=present&',
  //   "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
  //   "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
  //   "id_field":['id'],
  //   "view_url":"#/league/",
  //   "update_url":"",
  //   "datetimefields":['start_time','end_time'],
  //   "fetch_size":10,
  //   "table_name":"Deactive Battle",
  //   "show_filter":false,
  //   "show_export":false,
  //   "show_update":false,
  //   "show_delete":true,    
  //   "show_view":true,
  //   "add_url":"/#/add_league"

  // }
  
  return (
    <>
      <div className="card">
      <center>
      <CNav variant="pills" className="p-3">
        <CNavItem >
          <CNavLink
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
           Active Banner
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Deactive Banner
          </CNavLink>
        </CNavItem>
        
       
      </CNav>
      </center>
      </div>
      
      <div className="card mt-3">
      <CTabContent>
        <CTabPane visible={activeKey === 1}>
          <DataTableBanner props={present_data}/>

        </CTabPane>
        <CTabPane visible={activeKey === 2}>
        <DataTableBanner props={past_data}/>

        </CTabPane>
        
        
      </CTabContent>
      </div>
      </>


  )
}

export default Banner