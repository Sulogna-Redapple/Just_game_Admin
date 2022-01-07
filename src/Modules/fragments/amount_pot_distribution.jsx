import { CButton } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { api_url } from "../../config";




const AmountPotDistribution = (props) => {
  const league_id = props.league_id;

  const [ranks, setRanks] = useState([]);
  const [singleranks, setSingleRanks] = useState([]);
  const [adminCut, setAdminCut] = useState(0);
  const [prizeDetails, setprizeDetails] = useState([])
  console.log("clearing", league_id);
  const delete_last_amount = () => {

    ranks.pop();
    setRanks((oldArray) => [...ranks]);
  };



  const delete_last_rank = () => {
    singleranks.pop();
    setSingleRanks((rankArray) => [...singleranks]);
  };

  const save = () => {

    let data = {
      admin_earning: "0.00",
      distribution: ranks,
      league_id: league_id
    };

    console.log("data", data)
    data.distribution = data.distribution.map((obj) => {
      obj["rank"] = obj.start_rank + '-' + obj.end_rank;
      obj["count"] = obj.end_rank - obj.start_rank + 1;
      delete obj.start_rank;
      delete obj.end_rank;
      return obj;
    })

    data.distribution = data.distribution.concat(singleranks)

    console.log(data)

    var config = {
      method: "post",
      url: api_url + "admin/league/amount",
      data: data
    };
    axios(config).then((resp) => {
      if (resp.status === 200) {
        window.location.href = "/#/leagues";
      }
      console.log(resp);
    });
  };
  // const handleAdminCutamountChange = (e) => {
  //   if (e.target.value === "") {
  //     e.target.value = 0;
  //   }
  //   setAdminCut(parseInt(e.target.value));
  // };


  const handlePotChange = (e) => {
    let iteration = e.target.id.split("__")[1];
    let type = e.target.id.split("__")[0];
    if (iteration == 0 && type == "start_rank" && e.target.value == 0) {
      e.target.value = "";
    }

    ranks[iteration][type] = e.target.value;
    setRanks((oldArray) => [...ranks]);


  };

  const handlesinglerankChange = (e) => {
    let iteration = e.target.id.split("__")[1];
    let type = e.target.id.split("__")[0];
    if (iteration == 0 && type == "single_rank" && e.target.value == 0) {
      e.target.value = "";
    }

    singleranks[iteration][type] = e.target.value;
    setSingleRanks((oldArray) => [...singleranks]);
  };

  const add_more_amounts = function () {
    if (ranks.length === 0) {
      let element = {
        start_rank: 1,
        end_rank: 2,
        prize_amt: 0,
      };
      setRanks((oldArray) => [...oldArray, element]);
    } else {
      if (
        ranks[ranks.length - 1].end_rank !== "" &&
        ranks[ranks.length - 1].start_rank !== "" &&
        ranks[ranks.length - 1].prize_amt !== ""
      ) {
        let element = {
          start_rank: parseInt(ranks[ranks.length - 1].end_rank) + 1,
          end_rank: parseInt(ranks[ranks.length - 1].end_rank) + 2,
          prize_amt: 0,
        };
        setRanks((oldArray) => [...oldArray, element]);
      } else {
        window.alert("Start Rank, End Rank, Amount cannot be blank");
      }
    }
  };

  const add_more_amounts_single_rank = function () {
    let element = {
      count: 1,
      // amount: 0,
    };
    setSingleRanks((rankArray) => [...rankArray, element]);
  };



  const axios = require("axios").default;

  const [isMounting, setMounting] = useState(true);

  const mount = () => {
    axios
      .get(api_url + "admin/leagues/" + league_id, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        for (let i in res.data.prize_distribution.pots) {
          setRanks((oldArray) => [
            ...oldArray,
            res.data.prize_distribution.pots[i],
          ]);
        }
        setAdminCut(parseInt(res.data.prize_distribution.admin_earning));
      })
      .catch((err) => {
        console.log(err);
      });
    //////////////
    // var config = {
    //   method: 'get',
    //   url: 'http://3.109.149.116:3000/api/admin/reward-dist?league_id=' + league_id,


    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log("Admin", response.data.data.distribution[0].prize_amt);
    //     setprizeDetails(response.data.data.distribution[0]);

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  };

  // eslint-disable-next-line
  useEffect(() => {
    if (isMounting === true) {
      mount();
      setMounting(false);
    }
  });

  return (

    <>
      <div class="row">
        <div class="col-6">
          <form id="for-xyz">
            <div id="pot-amount-form">
              {/* <div  className='row pt-1 pb-3'>
                            <div className='col-8'>
                                <input class='form-control' value={adminCut} placeholder='Admin Cut amount' id={'admin_cut_amount'} onChange={(e) => {handleAdminCutamountChange((e))}} />
                            </div>
                            <div className='col-4'>
                                <input class='form-control' value={adminCut} placeholder='Admin Cut amount' disabled />
                            </div>

                    </div> */}
              <div>
                {singleranks.length > 0 &&
                  singleranks.map((singlerank, iteration) => (
                    <div className="row pt-1 pb-3">
                      <div className="col-3">
                        <label for={"rank__" + iteration}>Rank</label>
                        <input
                          class="form-control"
                          value={singleranks.single_rank} maxLength={2}
                          id={"rank__" + iteration}
                          onChange={(e) => {
                            handlesinglerankChange(e);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <label for={"prize_amt__" + iteration}>Amount</label>
                        <input
                          class="form-control"
                          value={singleranks.amount} maxLength={5}
                          id={"prize_amt__" + iteration}
                          onChange={(e) => {
                            handlesinglerankChange(e);
                          }}
                        />
                      </div>
                      {/* <div className="col-4">
                        <label for={"prize_amt__" + iteration}>
                          Total Amount
                        </label>

                        <input
                          value={
                            singlerank.amount * singlerank.single_rank
                          
                          }
                          class="form-control"
                          disabled
                        />
                      </div> */}
                    </div>
                  ))}
              </div>

              {ranks.length > 0 &&
                ranks.map((rank, iteration) => (
                  <div className="row pt-1 pb-3">
                    <div className="col-3">
                      <label for={"start_rank__" + iteration}>Start</label>
                      <input
                        class="form-control"
                        value={rank.start_rank} maxLength={2}
                        id={"start_rank__" + iteration}
                        onChange={(e) => {
                          handlePotChange(e);
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <label for={"end_rank__" + iteration}>End</label>
                      <input
                        class="form-control"
                        value={rank.end_rank} maxLength={2}
                        id={"end_rank__" + iteration}
                        onChange={(e) => {
                          handlePotChange(e);
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <label for={"prize_amt__" + iteration}>Amount</label>
                      <input
                        class="form-control"
                        value={rank.amount} maxLength={6}
                        id={"prize_amt__" + iteration}
                        onChange={(e) => {
                          handlePotChange(e);
                        }}
                      />
                    </div>
                    {/* <div className="col-4">
                      <label for={"prize_amt__" + iteration}>Total Amount</label>

                      <input
                        value={
                          rank.amount * (rank.end_rank - rank.start_rank + 1)
                        }
                        class="form-control"
                        disabled
                      />
                    </div> */}
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
      <CButton
        onClick={add_more_amounts_single_rank}
        color="warning"
        id="add_more_single_rank_btn"
      >
        Add Single Rank
      </CButton>{" "}
      &nbsp;
      <CButton
        onClick={add_more_amounts}
        color="warning"
        id="add_more_amounts_btn"
      >
        Add Rank Range
      </CButton>{" "}
      &nbsp;
      {ranks.length > 1 && (
        <CButton
          color="danger"
          id="delete_last_amount_btn"
          onClick={delete_last_amount}
        >
          Remove last Rank Range
        </CButton>
      )}
      &nbsp;
      {singleranks.length > 1 && (
        <CButton
          color="danger"
          id="delete_last_rank_btn"
          onClick={delete_last_rank}
        >
          Remove last Rank
        </CButton>
      )}
      &nbsp;
      <CButton color="success" onClick={save}>
        Save
      </CButton>
      {/* <div className='card p-3'>
                    
                    <b>Prize Amt</b>{prizeDetails.prize_amt}
                  
                    <b>rank</b>{prizeDetails.rank}
                    <b>count</b>{prizeDetails.count}
                    
                    


                </div> */}
                <>
      {/* <Table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Teacher Name</th>
              <th>Subject</th>
              <th>Class</th>
            </tr>
          </thead>

          {prizeDetails.map(data => (
            <tr key={data.rank}>
              <td>{data.count}</td>
              <td>{data.prize_amt}</td>
            
              
            </tr>
          ))}
        </Table> */}
      </>
    </>
  );
};

export default AmountPotDistribution;
