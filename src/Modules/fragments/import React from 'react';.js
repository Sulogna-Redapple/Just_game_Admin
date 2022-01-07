import React from 'react';
import DataTableLeaguesData from '../componets/DataTableLeaguesData'
const Payments= () => {
  
  const data_table_params = {
    "api_url":"admin/admin-earning",
    "headers":['League Name','My Earning','Transaction Date'],
    "api_fields":['league_name','admin_cut','updated_at'],
    "id_field":['id'],
    "view_url":"#/admin-earning/",
    "update_url":"",
    "fetch_size":10,
    "show_view":false,
    "show_update":false,
    "table_name":"Platform Earnings",
    "show_add":false,
    "show_filter":false,
    "show_delete":false,
    "filters":[
      {"1":"Debit"},
      {"2":"Credit"}
    ],
    "show_date_filter":true
  }

  return (
    <div className="card">
      <DataTableLeaguesData props={data_table_params}/>
    </div>
  )
}

export default Payments
EditLeague