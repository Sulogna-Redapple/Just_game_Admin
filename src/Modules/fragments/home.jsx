
import { api_url } from '../../config';
import React,{useState ,useEffect} from 'react';
import axios from 'axios';

const Home = (props) => {
  const [count, setCount] = useState(0);
  // const[earning,setEarning] = useState(0);

  var config = {
    method: "get",
    url: api_url + 'admin/users-count'
  };


  axios(config).then((resp) => {
    setCount(resp.data.data.user_count);
    if (resp.status === 200) {
      // window.location.href = "/#/dashboard";
    }
  });

  // var config1 = {
  //   method: "get",
  //   url:  api_url+'admin/admin-earning-total'
  // };

  // axios(config1).then((resp) => {
  //   setEarning(resp.data.data[0].admin_earning);
  //   if (resp.status === 200) {
  //     window.location.href = "/#/dashboard";
  //   }
  // });

    

  return (
      <>
      <h3>Total User Count: </h3> 
     <h3>Total Deposit: </h3>
     <h3>Total Earning: </h3> 
     <h3>Most Played Games: </h3>
      </>
    )
  }



  export default Home