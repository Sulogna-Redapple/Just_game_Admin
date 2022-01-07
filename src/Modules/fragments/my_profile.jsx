import { CButton } from '@coreui/react';
import React,{useEffect, useState} from 'react';


import {api_url,axios} from '../../config'

const MyProfile= (props) => {
    const [profileData,setProfileData] = useState({})
    const [isMounting,setMounting] = useState(true)

const changed = (e)=>{
    let newEdit = { ...profileData };
    newEdit[e.target.id] = e.target.value;
    setProfileData(newEdit);
}


const mount = () => {
    axios.post(
        api_url+'admin/admin-profile/', 
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

const changeProfileData = () => {
    let isPicturePresent = null;
    let profile_picture_elem = null;
    let profile_picture = null;
    try{
    profile_picture_elem = document.getElementById('profile_picture')
    profile_picture = profile_picture_elem.files[0]
    if(profile_picture != null){
    isPicturePresent = 1 
    }
    }
    catch{}
    const name= document.getElementById('name').value
    const email = document.getElementById('notification_email').value

    var data = new FormData();
    data.append('name',name)
    data.append('notification_email',email)
    if(isPicturePresent == 1){
        data.append('profile_picture',profile_picture, profile_picture.name)
    }
    var config = {
        method: 'patch',
        url: api_url+'admin/edit-profile/'+profileData.id,
        data : data
    };
    axios(config).then((resp)=>{
        if (resp.status === 200){
            window.alert('Data saved successfully')
            mount()
        }
        else{
            window.alert("Some error happend",resp)
        }
    })    
}


return (
<>
    {/* <h1 className='display-2'>Admin Profile</h1> */}

<div className='container'>
        <div className='row'>
            <div className='col-12 col-xl-4'>
                <div className='card p-3'>
                    <img alt='none' className='pb-3'
                          src={profileData.profile_picture}/>
                    <b>Name</b><br />
                    <input className='custom-input'  onChange={changed} id='name'  value={profileData.name}/><br/><br />

                    <b>Username</b><br />
                    <input className='custom-input' onChange={changed} id='username' value={profileData.username}/><br /><br />

                    <b>Email</b><br />
                    <input className='custom-input' onChange={changed} id='notification_email' value={profileData.notification_email}/><br /><br />

                    <b>User Picture</b><br />
                    <input className='custom-input' type='file' id ='profile_picture'/><br /><br />

                    <div className='row pb-3'>
                        <div className='col-12'>
                            <CButton style={{'width':'100%'}} onClick={changeProfileData}>Save</CButton>
                        </div>
                    </div>
                    {/* <CButton color='danger' style={{'width':'100%'}}>Deactivate</CButton> */}
                </div>
            </div>
        </div>
    </div>
</>
)
}


export default MyProfile