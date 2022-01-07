import React,{useEffect, useState} from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import DataTableLeague from '../componets/DataTableLeague'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'


function DataTablePayment(props) { 

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
    "table_name":"Active League",
    "show_filter":false,
    "show_export":false,
    "show_update":false,
    "show_delete":true,    
    "show_view":true,
    "add_url":"/#/add_league"

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
    "table_name":"Past League",
    "show_filter":false,
    "show_export":false,
    "show_view":true,
    "show_update":false,
    "show_delete":true, 
    "add_url":"/#/add_league"
  }
  let upcoming_data = {
    "api_url":'admin/leagues?category=upcoming&',
    "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
    "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['start_time','end_time'],
    "fetch_size":10,
    "table_name":"Upcoming League",
    "show_filter":false,
    "show_export":false,
    "show_update":true,
    "show_delete":true, 
    "show_view":true,
    "add_url":"/#/add_league",
    "icon":CIcon
  }
  let deactive_data = {
    "api_url":'admin/leagues?category=present&',
    "headers":['League Name','Start Date','End Date','No. of Players','Amount Earned'],
    "api_fields":['league_name','start_time','end_time','no_of_played','admin_cut'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['start_time','end_time'],
    "fetch_size":10,
    "table_name":"Deactive League",
    "show_filter":false,
    "show_export":false,
    "show_update":false,
    "show_delete":true,    
    "show_view":true,
    "add_url":"/#/add_league"

  }


 


  
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
           Active League
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Past League
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Upcoming League
          </CNavLink>
        </CNavItem>
        <CNavItem>
          
          <CNavLink
            active={activeKey === 4}
            onClick={() => setActiveKey(4)}
          >
           Deactive League
          </CNavLink>
        </CNavItem>
       
       
      </CNav>
      </center>
      </div>
      
      <div className="card mt-3">
      <CTabContent>
        <CTabPane visible={activeKey === 1}>
          <DataTableLeague props={present_data}/>

        </CTabPane>
        <CTabPane visible={activeKey === 2}>
        <DataTableLeague props={past_data}/>

        </CTabPane>
        <CTabPane visible={activeKey === 3}>
        <DataTableLeague props={upcoming_data}/>

        </CTabPane>
        <CTabPane visible={activeKey === 4}>
        <DataTableLeague props={deactive_data}/>

        </CTabPane>
        
      </CTabContent>
      </div>


  </>

  );
}

  export default DataTablePayment