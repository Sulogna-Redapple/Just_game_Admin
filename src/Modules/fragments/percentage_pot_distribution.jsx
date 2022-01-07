import { CButton } from "@coreui/react";
import React, { useState, useEffect } from "react";

import { api_url } from "../../config";
import { CCallout } from "@coreui/react";

import { CAlert, CFormSelect, CFormLabel, CFormControl } from "@coreui/react";

const axios = require("axios").default;

const PercentagePotDistribution = (props) => {
  const league_id = props.league_id;
  const [adminCut, setAdminCut] = useState(0);
  // const [spot, setSpot] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [spotNumber, setSpotNumber] = useState([]);

  const handleAdminCutPercentageChange = (e) => {
    if (e.target.value === "") {
      e.target.value = 0;
    }
    setAdminCut(parseInt(e.target.value));
  };

  const handleSpotChange = (e) => {
   
    let iteration = e.target.id.split("__")[1];
    let type = e.target.id.split("__")[0];
    if (iteration == 0 && type == "spot_number" && e.target.value == 0) {
      e.target.value = "";
    }

    
    ranks[iteration][type] = e.target.value;
    setRanks((oldArray) => [...ranks]);
    // console.log(ranks)
    // if(e.target.value > 10) {
    //   alert("please hhjkhjkh")
    // }
  };

  const handleSpotNumberChange = (e) => {
    if (e.target.value === "") {
      e.target.value = 0;
    }
    setSpotNumber(parseInt(e.target.value));
    
  };



  // const handleSpotLengthChange = (e) => {
  //   if (e.target.value === "") {
  //     e.target.value = 0;
  //   }
  //   setSpotLength(parseInt(e.target.value));
  // }

  const add_more_distribution_slab = function () {
    if (ranks.length === 0) {
      let element = {
        spot_number: 1,
        spot_length: 2,
      };
      setRanks((oldArray) => [...oldArray, element]);
    } else {
      if (
        ranks[ranks.length - 1].spot_length !== "" &&
        ranks[ranks.length - 1].spot_number !== ""
      ) {
        let element = {
          spot_number: parseInt(ranks[ranks.length - 1].spot_length) + 1,
          spot_length: parseInt(ranks[ranks.length - 1].spot_length) + 2,
        };
        setRanks((oldArray) => [...oldArray, element]);
      } else {
        window.alert("spot_number,spot_length cannot be blank");
      }
    }
  };

  const delete_last_rank = () => {
    ranks.pop();
    setRanks((rankArray) => [...ranks]);
  };

  const save = () => {
    let spotObj = {};
    ranks.map((obj)=>{
    spotObj[`${obj.spot_number}`] = parseInt(obj.spot_length);
    });
    let data = {
      admin_percentage: adminCut,
      spotObj: spotObj,
      league_id:league_id
    };
    var config = {
      method: "post",
      url: api_url + "admin/league/percentage/",
      data: data,
    };
    axios(config).then((resp) => {
      if (resp.status === 200) {
        window.location.href = "/#/leagues";
      }
    });
  };

  return (
    <>
      <div className="col-8">
        <label for={"admin_cut_percentage"}>Admin Percentage(%)</label>
        <input
          class="form-control"
          value={adminCut}  maxLength={2}
          placeholder="Admin Cut percentage"
          id={"admin_cut_percentage"}
          onChange={(e) => {
            handleAdminCutPercentageChange(e);
          }}
        />&nbsp;
        <div className="col-sm-3">
          <label for={"spot"}>No. of spots</label>
          <input
            class="form-control"
            value={spotNumber} maxLength={2}
            placeholder="Spot Number"
            id={"spot"}
            onChange={(e) => {
              handleSpotNumberChange(e);
            }}
          />&nbsp; &nbsp;
        </div>
        {ranks.length > 0 &&
          ranks.map((rank, iteration) => (
            <div className="row pt-1 pb-3">
              <div className="col-3">
                <label for={"spot_number__" + iteration}>Spot Number</label>
                <input
                  class="form-control"
                  value={ranks.spot_number} maxLength={2}
                  id={"spot_number__" + iteration}
                  onChange={(e) => {
                    handleSpotChange(e);
                  }}
                />
              </div>
              <div className="col-4">
                <label for={"spot_length__" + iteration}>No of distribution</label>
                <input
                  class="form-control"
                  value={ranks.spot_length} maxLength={2}
                  id={"spot_length__" + iteration}
                  onChange={(e) => {
                    handleSpotChange(e);
                  }}
                />
              </div>
            </div>
          ))}
        <div className="col-sm-2"></div>
      </div>
      
      <CButton
        onClick={add_more_distribution_slab} disabled = {ranks.length > spotNumber -1 }
        color="warning"
        id="add_more_distribution_slab_btn"
      >
        Add Distribution Slab
      </CButton>
      {""}
      &nbsp; &nbsp;
      {ranks.length > 1 && (
        <CButton
          color="danger"
          id="delete_last_rank_btn"
          onClick={delete_last_rank}
        >
          Remove last Rank
        </CButton>
      )}&nbsp; &nbsp;
      <CButton color="success" onClick={save}>
        Save
      </CButton>
      &nbsp; &nbsp;
    </>
  );
};

export default PercentagePotDistribution;
