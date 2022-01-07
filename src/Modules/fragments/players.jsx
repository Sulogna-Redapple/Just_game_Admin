import React,{ useEffect} from 'react';
import DataTablePlayers from '../componets/DataTablePlayers'
const Players= () => {
  
  const data_table_params = {
    "api_url":"admin/users",
    "headers":['Username','Mobile No','Deposit Amount','Winning Amount','Withdrawl Amount','Ballance','Profit','Send SMS','Block/Unblock'],
    "api_fields":['username','username','deposit_amount','username','username','deposit_amount','username','username','deposit_amount'],
    "id_field":['id'],
    "view_url":"#/players/",
    "update_url":"",
    "fetch_size":10,
    "table_name":"User Details",
    "show_add":false,
    "show_filter":true,
    "show_delete":true,
    "show_update":false,
    "filters":[
      {"0":"Active"},
      {"1":"Deactivated"}
    ],
    "filter_api_parameter":"status",

  }
  useEffect(()=>{
    if(localStorage.getItem('token')==null){
      window.location.href='/#/'
    }
  })
  
  return (
    <div className="card">
      <DataTablePlayers props={data_table_params}/>
    </div>
  )
}

export default Players