import { CButton } from '@coreui/react';
import React,{useEffect, useState} from 'react';
import DataTableTransactionDetails from '../componets/DataTableTransactionDetails'
import DataTablePlayingHistory from '../componets/DataTablePlayingHistory'

import {
CCardHeader
} from '@coreui/react'
import {api_url,axios} from '../../config'

const Player= (props) => {
const [profileData,setProfileData] = useState({})
 const [ProfileStatus,setProfileStatus] = useState('')
const [adminCut, setAdminCut] = useState(0);
// eslint-disable-next-line
const [isMounting,setMounting] = useState(true)

// const [isMounting,ProfileButton] = useState(true)

const data_table_params_transaction_history = {
    "api_url":'admin/transactions/'+props.match.params.id,
    "headers":['Created At','Transaction Id','Debit','Credit'],
    "api_fields":['created_at','transaction_id','debit','credit'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['created_at'],
    "fetch_size":10,
    "table_name":"Transactions Details",
    "show_view":false,
    "show_update":false,
    "show_add":false,
    "show_delete":false
}
const data_table_params_playing_history = {
    "api_url":'admin/transactions/'+props.match.params.id,
    "headers":['Created At','Transaction Id','Debit','Credit'],
    "api_fields":['created_at','transaction_id','debit','credit'],
    "id_field":['id'],
    "view_url":"#/league/",
    "update_url":"",
    "datetimefields":['created_at'],
    "fetch_size":10,
    "table_name":"Playing History",
    "show_view":false,
    "show_update":false,
    "show_add":false,
    "show_delete":false
}
// const  buttonData = document.getElementById("myButton1").value
// const [status, setStatus] =  useState (0)
const mount = () => {
    axios.get(
        api_url+'admin/users/'+props.match.params.id, 
        {
        }).then(res=>{
            console.log("DATA",res)
            setProfileData(res.data.data[0]);
            setProfileStatus(res.data.data[0].status);
            console.log("profileData",res.data.data[0].status)
            }).catch(err=>{
                console.log(err)
            })
}

const add_coins = () => {
    // var data = new FormData();
    // data.append('user_id', props.match.params.id);
    // data.append('transaction_value', document.getElementById('transaction_value').value);
    // data.append('transaction_id', document.getElementById('transaction_id').value);
    let data = {
        'user_id':props.match.params.id,
        'transaction_value':document.getElementById('transaction_value').value,
    }
    var config = {
        method: 'post',
        url: api_url+'admin/add-balance',
        data : data
    };
    axios(config).then((resp)=>{
        if (resp.status === 200){
            document.getElementById('transaction_value').value = 0
            mount()
        }
        else{
            window.alert("Some error happend",resp)
        }
    })    
}

const deactive = () => {
    let updatedStatus=ProfileStatus;
    if(ProfileStatus == 0) {
        updatedStatus = 1
    }else{
        updatedStatus = 0
    }

    console.log(ProfileStatus, updatedStatus)
    let userid = parseInt(props.match.params.id)
    let data = {
        'user_id':userid,
        'status': updatedStatus,
    }
    const id = props.match.params.id;
    var config = {
        method: 'post',
        url: api_url+'admin/update-user-status',
        headers: {
            'Content-Type': 'application/json',
             authorization: 'Bearer '+localStorage.getItem('token')
        },
        data : data
    };
    //alert("hi")
   if(updatedStatus ==0){
       console.log("active")

   }else{
       console.log('deactive')
   }
    console.log("resp",data)
    axios(config).then((resp)=>{
        if (resp.status === 200){
            // document.getElementById('
            console.log(resp)
            setProfileStatus(updatedStatus)
        }
        else{
            window.alert("Some error happend",resp)
        }
    }) 
// if(ProfileStatus==1){
//     let data = {
//         'user_id':props.match.params.id,
//         'status': 0,
//     }
//     const id = props.match.params.id;
//     var config = {
//         method: 'post',
//         url: api_url+'admin/update-user-status',
//         headers: {
//             'Content-Type': 'application/json',
//              authorization: 'Bearer '+localStorage.getItem('token')
//         },
//         data : data
//     };
//     alert("hi")
//     console.log("resp",data)
//     axios(config).then((resp)=>{
//         if (resp.status === 200){
//             // document.getElementById('
//             console.log(resp)
//             setProfileStatus(updatedStatus)
//         }
//         else{
//             window.alert("Some error happend",resp)
//         }
//     })    
// }
// else if(ProfileStatus==0){
//     let data = {
//         'user_id':props.match.params.id,
//         'status': 1,
//     }
//     const id = props.match.params.id;
//     var config = {
//         method: 'post',
//         url: api_url+'admin/update-user-status',
//         headers: {
//             'Content-Type': 'application/json',
//              authorization: 'Bearer '+localStorage.getItem('token')
//         },
//         data : data
//     };
//     alert("hi")
//     console.log("resp",data)
//     axios(config).then((resp)=>{
//         if (resp.status === 200){
//             // document.getElementById('
//             console.log(resp)
//             setProfileStatus(updatedStatus)
//         }
//         else{
//             window.alert("Some error happend",resp)
//         }
//     })    
// }
    
   
  };
// const deactive = () => {
//     // const status = props.location.editProps.data.status
    
//        var config = {
//         method: 'post',
//         url: api_url+'admin/update-user-status',
//         headers: {
//             'Content-Type': 'application/json',
//              authorization: 'Bearer '+localStorage.getItem('token')
//         },
       
//     }
//     axios(config).then((resp)=>{
//         console.log("RESPONSE",resp)
//         setStatus( resp.data.status)
//     })  
// }

const inputChange = (e) => {
    if (e.target.value === "") {
      e.target.value = 0;
    }
    setAdminCut(parseInt(e.target.value));
  };
// const deactive = () => {
  
//     let data = {
//         'user_id':props.match.params.id,
//         'status': buttonData,
//     }
//     var config = {
//         method: 'post',
//         url: api_url+'admin/update-user-status',
//         data : data
//     };
//     alert("hi")
//     console.log("resp",data)
//     axios(config).then((resp)=>{
//         if (resp.status === 200){
//             // document.getElementById('
//             console.log("DATA",resp)
//             // mount()
//             setProfileStatus(buttonData);
//         }
//         else{
//             window.alert("Some error happend",resp)
//         }
//     })    
// }
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
                           src="https://picsum.photos/200"/>
                    <b>Username</b><br />
                    <input className='custom-input' value={profileData.name}/><br /><br />

                    <b>Mobile no</b><br />
                    <input className='custom-input' value={profileData.username}/><br /><br />

                    {/* <b>User Picture</b><br />
                    <input className='custom-input' type='file'/><br /><br /> */}

                    {/* <div className='row pb-3'>
                        <div className='col-12'>
                            <CButton style={{'width':'100%'}}>Save</CButton>
                        </div>
                    </div> */}
                     {/* {profileData.status == 0 ? (
                         
                         <CButton color='success'  onClick={deactive}style={{'width':'100%'}}>Activate</CButton>
                                
                            ) : (
                                <CButton color='danger'  onClick={deactive}style={{'width':'100%'}}>Deactivate</CButton>
                            )}
                    */} 
                    {/* onChange={(e) => {
            handleAdminCutPercentageChange(e);success
        }} */}
                    
                      {/* <CButton color='success' id='active_value' onClick={()=>{deactive()}} style={{'width':'100%'}} color={!status ? "danger":"success"} >{!status ? "Deactive" : "Active"}</CButton> */}
                       {(ProfileStatus==0)  ? 
                         
                         <CButton id='myButton1' onClick={()=>{deactive()}} style={{'width':'100%'}}>Deactivate</CButton>
                                
                             : 
                                <CButton id='myButton1' onClick={()=>{deactive()}} style={{'width':'100%'}}>Activate</CButton>
                            }
                      

                </div>

            </div>

            <div className='col-12 col-xl-8 pt-2 pt-xl-0'>
                <div className='card'>
                    <DataTableTransactionDetails props={data_table_params_transaction_history}/>
                </div>
                <div className='card'>
                    <DataTablePlayingHistory props={data_table_params_playing_history}/>
                </div>
                <div className='col-12 mt-3'>
                    <div className="row">
                    <div className='col-12 col-xl-6'>
                        <div className='card'>
                            <CCardHeader className='bg-warning text-white'><b>Add Balance</b></CCardHeader>
                            <form className='p-3'>
                            <center >
                            {/* <br/><b>Transaction Id</b><br />
                            <input id='transaction_id' className='custom-input' style={{"text-align":'center'}} /><br /> */}
                            
                            <br/><b>Add Balance</b><br />
                            <input   id='transaction_value' min="0"  value={adminCut} type="number" step="1" onChange={(e) => {inputChange(e); }} placeholder="0" className='custom-input' style={{"text-align":'center'}} /><br />
                            <CButton color='warning'  onClick={add_coins}>Add Cash</CButton>
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
                            <br/><b>Deposit Ammount</b><br /><br/>
                            <h1 className='display-4'>{parseFloat(profileData.winning_amount)+parseFloat(profileData.deposit_amount)}</h1>

                            </center>
                            </form>
                            <form className='p-3'>
                                <center >
                                    <img alt='none' style={{"width":"15%"}} src="data:image/png;base64,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"></img>
                            <br/><b>Winning Ammount</b><br /><br/>
                            <h1 className='display-4'>{parseFloat(profileData.winning_amount)+parseFloat(profileData.deposit_amount)}</h1>

                            </center>
                            </form>
                            <form className='p-3'>
                                <center >
                                    <img alt='none' style={{"width":"15%"}} src="data:image/png;base64,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"></img>
                            <br/><b>Withdrawn Ammount</b><br /><br/>
                            <h1 className='display-4'>{parseFloat(profileData.winning_amount)+parseFloat(profileData.deposit_amount)}</h1>

                            </center>
                            </form>
                        </div>
                        {/* <div className="row mb-3">
                        <div className="d-grid gap-2 d-md-block">
                          <CButton id='save-button' style={{ float: 'right' }} color="success"  >Deactive</CButton>
                        </div>
                      </div>
                       */}
                    </div>
                    </div>

                </div>
                   
                      

               
            </div>
        </div>
    </div>
                    <div className="row mb-3">
                        <div className="d-grid gap-2 d-md-block">
                          <CButton id='save-button' style={{ float: 'right' }} color="success"  >Send SMS</CButton>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="d-grid gap-2 d-md-block">
                          <CButton id='save-button' style={{ float: 'left' }} color="success"  >Block/Unblock</CButton>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div  className="btn-group ml-auto "  >
                          <CButton id='save-button'  color="success" style={{width:'20px',marginLeft: '600px',marginRight: '600px'}}>Delete</CButton>
                        </div>
                      </div>
</>
)
}


export default Player