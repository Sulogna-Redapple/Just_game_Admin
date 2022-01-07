import React,{useState, useEffect} from 'react';
import {
// CNav,
// CNavItem,
// CNavLink,
// CTabContent,
// CTabPane,
// CFormCheck,
} from '@coreui/react'
import {axios} from 'axios';
import {api_url} from '../../config'

const DelLeague= (props) => {
    const league_id = props.match.params.id;
    // const [activeKey, setActiveKey] = useState(1)
    

// const [leagueDetails,setLeagueDetails] = useState([])
const [isMounting,setMounting] = useState(true)



const mount = () =>{
  axios.get(api_url+'admin/leagues/'+league_id, {headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer '+localStorage.getItem('token')}
  }).then(res=>{
    //   setLeagueDetails(res.data.data[0])
  }).catch(err=>{
    console.log(err)
  })
}

// eslint-disable-next-line
useEffect(()=>{
  if (isMounting === true){
    mount();
    setMounting(false)
  }
})

return (
<>
      
</>
)
}


export default DelLeague