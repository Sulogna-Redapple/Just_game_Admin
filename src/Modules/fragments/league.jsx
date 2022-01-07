import React,{useState, useEffect} from 'react';
import PercentagePotDistribution from './percentage_pot_distribution';
import AmountPotDistribution from './amount_pot_distribution';
import DataTable from '../componets/DataTable';
import { Table, Button, Modal } from "react-bootstrap";
// import { Spinner } from 'reactstrap';
import {
CNav,
CNavItem,
CNavLink,
CTabContent,
CTabPane,
CFormCheck,
} from '@coreui/react'
import {api_url} from '../../config'

const League= (props) => {
    const league_id = props.match.params.id;
    const [activeKey, setActiveKey] = useState(1)
    const axios = require('axios').default;
    const [prizeDetails, setprizeDetails] = useState([])
    const [distributionType, setdistributionType] = useState("")
const [leagueDetails,setLeagueDetails] = useState([])
const [isMounting,setMounting] = useState(true)

const data_table_params = {
  "api_url":'admin/leagues-player/'+props.match.params.id,
  "headers":['Name','Winning Amount','Balance'],
  "api_fields":['name','winning_amount','deposit_amount'],
  "id_field":['user_id'],
  "view_url":"#/players/",
  "update_url":"",
  "fetch_size":10,
  "table_name":"Players",
  "show_add":false,
  "show_filter":false,
  "show_update":false,
  "show_delete":false,
  "filters":[
    {"0":"Active"},
    {"1":"Deactivated"}
  ],
  "filter_api_parameter":"status",

}
//http://3.109.149.116:3000/api/admin/leagues?category=past&?page=1&limit=10
const data_table_params1 = {
  "api_url":'leaderboard/?league_id='+props.match.params.id,
  "headers":['Name','Score','Rank'],
  "api_fields":['name','score','Rank'],
  "id_field":['user_id'],
  "view_url":"#/leaderboard/",
  "update_url":"",
  "fetch_size":10,
  "table_name":"leaderboard",
  "show_add":false,
  "show_view":false,
  "show_filter":false,
  "show_update":false,
  "show_delete":false,
  "filters":[
    {"0":"Active"},
    {"1":"Deactivated"}
  ],
  "filter_api_parameter":"status",

}

let distType = '';

const mount = () =>{
  axios.get(api_url+'admin/leagues/'+league_id, {headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer '+localStorage.getItem('token')}
  }).then(res=>{
    console.log(res)
      setLeagueDetails(res.data.data[0])
      
  }).catch(err=>{
    console.log(err)
    alert("No Data Found")
  })


   var config = {
      method: 'get',
      url: 'http://3.109.149.116:3000/api/admin/reward-dist?league_id=' + league_id,


    };

    axios(config)
      .then(function (response) {
        console.log("Admin", response.data.data.distribution[0].prize_amt);
        console.log("distribution type", response.data.data.distribution_type);
        setprizeDetails(response.data.data.distribution);

        distType = response.data.data.distribution_type
        setdistributionType(distType);

        if(distType == 2) {
          console.log("amount based")
        }

      })
      .catch(function (error) {
        console.log(error);
      });
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
      <div className="card">
      <center>
      <CNav variant="pills" className="p-3">
        <CNavItem >
          <CNavLink
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Details
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Leaderboard
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Players
          </CNavLink>
          
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 4}
            onClick={() => setActiveKey(4)}
          >
            Pot Distribution
          </CNavLink>
        </CNavItem>

      </CNav>
      </center>
      </div>
      
      <div className="card mt-3">
      <CTabContent>
        <CTabPane visible={activeKey === 1}>
        <div className='card p-3'>
                    <img className='pb-3'
                        src={leagueDetails.league_image} alt='Loading..'/>
                    <b>League Name</b>{leagueDetails.league_name}
                    {/* <b>League Availability</b>{leagueDetails.league_availability} */}
                    <b>Start Time</b>{leagueDetails.start_time}
                    <b>End Time</b>{leagueDetails.end_time}
                    <b>Level </b>{leagueDetails.level_id}
                    <b>No.of laps</b>{leagueDetails.no_of_laps}
                    <b>Entry fee</b>{leagueDetails.entry_fee}
                    <b>Max Player</b>{leagueDetails.max_player}
                    <b>Track Type</b>{leagueDetails.track_type}
                    {/* <b>Total Prize Value</b>{leagueDetails.total_prize_value} */}
                    {/* <b>Platform Commission Percentage</b>{leagueDetails.platform_commission_percentage} % */}


                </div>

        </CTabPane>
        <CTabPane visible={activeKey === 2}>
        <DataTable props={data_table_params1}> </DataTable>
        </CTabPane>
        <CTabPane visible={activeKey === 3}>
          {/* <h2>Leaderboard</h2> */}
         <DataTable props={data_table_params}> </DataTable>
        </CTabPane>
        <CTabPane visible={activeKey === 4 || activeKey === 5 || activeKey === 6}>
        <div className='card p-3'>
        <h2>Pot Distribution</h2>
            <div className='row'>
              <div className='col-12'>
                <CFormCheck inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox1"
                  value="option1"
                  label="Percentage Distribution"
                  active={activeKey === 5}
                  onClick={() => setActiveKey(5)}
                />
                <CFormCheck
                  inline
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineCheckbox2"
                  value="option2"
                  label="Amount Distribution"
                  active={activeKey === 6}
                  onClick={() => setActiveKey(6)}

                />
              </div>
              <>
      <Table visible={activeKey === 5 || activeKey === 6}>
        <h1>disttype{distType}</h1>
          <thead > 
            <tr>
              <th>Count</th>
              <th>Prize Amt</th>
              <th>Rank</th>
            
            </tr>
          </thead>

          {prizeDetails.map(data => (
            <tr key={data}>
              <td>{data.count}</td>
              <td>{data.prize_amt}</td>
              <td>{data.rank}</td>
            
              
            </tr>
          ))}
        </Table>
        </>
              <CTabContent>
              <CTabPane visible={activeKey === 5}>
                  <PercentagePotDistribution league_id={league_id}/>
              </CTabPane>
              <CTabPane visible={activeKey === 6}>
                <AmountPotDistribution league_id={league_id}/>
              </CTabPane>

              </CTabContent>
            </div>
           
        </div>

        </CTabPane>

      </CTabContent>
      </div>




</>
)
}


export default League