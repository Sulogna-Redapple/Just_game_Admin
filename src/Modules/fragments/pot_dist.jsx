import { CButton } from '@coreui/react';
import React,{useEffect, useState} from 'react';
import DataTable from '../componets/DataTable'

import {
CCardHeader
} from '@coreui/react'
import {api_url,axios} from '../../config'

const Player= (props) => {
const [profileData,setProfileData] = useState({})

// eslint-disable-next-line
const [isMounting,setMounting] = useState(true)
const data_table_params = {
    "api_url":'api/admin/prize-dist'+props.match.params.id,
    "headers":['min_player','max_player','prize_percentage','prize_amount'],
    "api_fields":['min_player','max_player','prize_percentage','prize_amount'],
    "id_field":['id'],
    "view_url":"#/player/",
    "update_url":"",
    "datetimefields":['created_at'],
    "fetch_size":10,
    "table_name":"Transactions",
    "show_view":false,
    "show_update":false,
    "show_add":false,
    "show_delete":false
}

const mount = () => {
    axios.get(
        api_url+'api/admin/prize-dist'+props.match.params.id, 
        {
        }).then(res=>{
            setProfileData(res.data.data[0]);
            }).catch(err=>{
                console.log(err)
            })
}



// eslint-disable-next-line
useEffect(() => {
    if (isMounting === true){
        mount();
        setMounting(false)
    }
})

return (
<>

    <div className='container'>
        <div className='row'>
            <div className='col-12 col-xl-4'>
                <div className='card p-3'>
                    <img alt='none' className='pb-3'
                          src={profileData.profile_picture}/>
                    <b>Name</b><br />
                    <input className='custom-input' value={profileData.name}/><br /><br />

                    <b>Username</b><br />
                    <input className='custom-input' value={profileData.username}/><br /><br />

                    <b>User Picture</b><br />
                    <input className='custom-input' type='file'/><br /><br />

                    <div className='row pb-3'>
                        <div className='col-12'>
                            <CButton style={{'width':'100%'}}>Save</CButton>
                        </div>
                    </div>
                    <CButton color='danger' style={{'width':'100%'}}>Deactivate</CButton>

                </div>

            </div>

            <div className='col-12 col-xl-8 pt-2 pt-xl-0'>
                <div className='card'>
                    <DataTable props={data_table_params}/>
                </div>
                <div className='col-12 mt-3'>
                    <div className="row">
                    <div className='col-12 col-xl-6'>
                        <div className='card'>
                            <CCardHeader className='bg-warning text-white'><b>Add Coins</b></CCardHeader>
                            <form className='p-3'>
                            <center >
                            {/* <br/><b>Transaction Id</b><br />
                            <input id='transaction_id' className='custom-input' style={{"text-align":'center'}} /><br /> */}
                            
                            <br/><b>Coins</b><br />
                            <input  id='transaction_value' type="number" placeholder="0" className='custom-input' style={{"text-align":'center'}} /><br />
                            {/* <CButton color='warning' onClick={add_coins}>Add Coins</CButton> */}
                            </center>
                            </form>
                        </div>
                    </div>
                    <div className='col-12 col-xl-6 pt-3 pt-xl-0'>
                        <div className='card'>
                            <CCardHeader className='bg-warning text-white'><b>Balance</b></CCardHeader>
                            <form className='p-3'>
                                <center >
                                    <img alt='none' style={{"width":"15%"}} src="data:image/png;base64,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"></img>
                            <br/><b>Total Balance (coins)</b><br /><br/>
                            <h1 className='display-4'>{parseFloat(profileData.winning_amount)+parseFloat(profileData.deposit_amount)}</h1>

                            </center>
                            </form>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</>
)
}


export default Player