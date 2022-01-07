import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButtonGroup,

  CFormControl,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CFormSelect,

} from '@coreui/react'
import {
  CAlert,

  CFormLabel,


} from '@coreui/react'
import DatePicker from "react-datepicker";
import { api_url, axios } from '../../config'

function DataTableBanner(props) {
  console.log("leaderboard", props)
  const parameters = props.props
  const [datas, setDatas] = useState([])
  const [thisPage, setThisPage] = useState(1)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paginations, setPaginations] = useState([])
  const [disabled, setDisabled] = useState(false);
  const [isMounting, setMounting] = useState(true)
  let search_field_id = 'searchKey' + String(Math.random(2))
  let filter_field_id = 'filterFiled' + String(Math.random(2))
  let dateFilterStartId = 'date_filter_start' + String(Math.random(2))
  let dateFilterEndId = 'date_filter_end' + String(Math.random(2))

  let no_of_pages = 0;
  let fetch_size = parameters.fetch_size;
  let pagination_config = []
  const mount = () => {
    axios.get(
      api_url + parameters.api_url + '?page=1&limit=' + fetch_size,
      {
      }).then(res => {
        console.log(res)
        no_of_pages = res.data.count / parameters.fetch_size;
        if (res.data.count % parameters.fetch_size !== 0) {
          no_of_pages += 1;
        }
        for (let i = 1; i <= no_of_pages; i++) {
          pagination_config[i - 1] = i;
        }
        setPaginations(pagination_config)
        setDatas(res.data.data);
        console.log("LEAderBoardData", res.data.data)
        console.log("LEAderBoardDataLength", res.data.data[0].status)
        // if(res.data.data == ""){
        //   alert("No Data Found")
        // }
      }).catch(err => {
        console.log(err)
      }
      )
  }

  // eslint-disable-next-line
  useEffect(() => {
    if (isMounting === true) {
      mount();
      setMounting(false)
    }

  })

  const searchWithDate = () => {

    // let filter_value = ''
    // let filter_api_parameter = ''
    // if(parameters.show_filter ===true){
    //   filter_value = document.getElementById(filter_field_id).value;
    //   filter_api_parameter = parameters.filter_api_parameter;      
    // }

    //usestate
    let date = new Date()
    let { start_date, end_date } = date;
    try {
      start_date = new Date(document.getElementById(dateFilterStartId).value).toISOString().split('/')[0];
    }
    catch (error) {
      console.log(error)
    }

    try {
      end_date = new Date(document.getElementById(dateFilterEndId).value).toISOString().split('/')[0];
      end_date = end_date.split('T')
      end_date = end_date[0] + 'T23:59:59.000Z'
    }
    catch (error) {
      console.log(error)
    }

    axios.get(api_url + parameters.api_url + '?start_date=' + start_date + '&end_date=' + end_date,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        setDatas([...res.data.data])
      }).catch(err => {
        console.log(err)
      })

  }
  const search_and_update = (searchKey) => {
    let filter_value = ''
    let filter_api_parameter = ''
    if (parameters.show_filter === true) {
      filter_value = document.getElementById(filter_field_id).value;
      filter_api_parameter = parameters.filter_api_parameter;

    }
    axios.get(api_url + parameters.api_url + '?page=1&limit=' + fetch_size + '&searchKey=' + searchKey + '&' + (filter_api_parameter) + '=' + filter_value + '?start_date=&end_date=',
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        setDatas([...res.data.data])
      }).catch(err => {
        console.log(err)
      })
  }

  const paginate = (page) => {
    let filter_value = ''
    let filter_api_parameter = ''
    if (parameters.show_filter === true) {
      filter_value = document.getElementById(filter_field_id).value;
      filter_api_parameter = parameters.filter_api_parameter
    }

    let searchKey = document.getElementById(search_field_id).value
    axios.get(api_url + parameters.api_url + '?page=' + page + '&limit=' + fetch_size + '&searchKey=' + searchKey + '&' + (filter_api_parameter) + '=' + filter_value,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        setDatas([...res.data.data])
        setThisPage(page);

      }).catch(err => {
        console.log(err)
      })
  }
  const search = () => {
    // const value=document.getElementById(search_field_id).value.replace(/[^\w\s]/gi, "").replace(/\s/g, '') 
    // document.getElementById(search_field_id).value = value;
    // console.log(value);
    const value = document.getElementById(search_field_id).value.trim();
    search_and_update(value)

  }

  //delete function upcoming http://3.109.149.116:3003/
  const deleteButton = (data) => {
    console.log(data);
    axios.delete(`http://3.109.149.116:3003/api/admin/leagues/${data.league_id}`).then(result => {
      console.log(result)
      mount()

    })
  }
  //  const handleKeyPress=(evt)=> {
  //     console.log( "You pressed a key." )
  // //     var charCode = (evt.which) ? evt.which : evt.keyCode
  // //     console.log(charCode)
  // //     if (charCode != 46 && charCode > 31 
  // // 	&& (charCode < 48 || charCode > 57)&& (charCode == 35 || charCode > 95 || charCode >37 || charCode > 42 || charCode > 64))
  // //   {

  // // alert("wrong");

  // //   }
  //   // console.log(charCode)
  //   //       return false;
  //   //       return true;
  // console.log(evt.target.value);
  // evt.target.value.replace(/[^\w\s]/gi, "")
  //   return true;
  // }
  const edit_banner = function () {
     //alert("HIE")
    // window.location.href = "/#/edit_banner";
  };
  const copy_battle = function () {
    alert("HELLO")
    window.location.href = "/#/otp";
  };
  const filter = () => {
    let filter_value = ''
    let filter_api_parameter = ''
    if (parameters.show_filter === true) {
      filter_value = document.getElementById(filter_field_id).value;
      filter_api_parameter = parameters.filter_api_parameter
    }
    let searchKey = document.getElementById(search_field_id).value
    axios.get(api_url + parameters.api_url + '?page=1&limit=' + fetch_size + '&searchKey=' + searchKey + '&' + (filter_api_parameter) + '=' + filter_value,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        setDatas([...res.data.data])
      }).catch(err => {
        console.log(err)
      })

  }
  return (
    <>
      <div className="container">
        <div className="row">
          <CCardHeader>
            <div className='row'>
              <div className="col-12 col-sm-12 col-md-12 col-xl-3">
                <b>{parameters.table_name}</b>
              </div>
              <div className="col-12 col-sm-5 col-md-5 col-xl-5"></div>
              <div className="col-12 col-md-12 col-xl-1">
                {parameters.show_add !== false &&
                  <a href={parameters.add_url}>
                    <CButton color='dark' size='sm' style={{ "float": "right", "width": "100%" }}>
                      + Add
                    </CButton>
                  </a>
                }
              </div>

              <div className="col-12 col-md-12 col-xl-3 pt-sm-1 pt-md-1 pt-1 pt-xl-0">
                <CFormControl type="text" size="sm" id={search_field_id} onChange={search}
                  placeholder="Search ..." aria-label="sm input example" style={{ "width": "100%" }} onkeypress="return event.charCode != 32" disabled={disabled} />







              </div>
            </div>
          </CCardHeader>
        </div>
      </div>

      <div className="container p-3">

        <div className='row mb-3'>
          <div className='col-3'>
            {parameters.show_filter &&
              <CFormSelect size="sm" className="mb-1" onChange={filter} id={filter_field_id}>
                <option>Filter by</option>
                {parameters.filters.map((obj, id) => (
                  <option value={Object.keys(obj)[0]}>{obj[Object.keys(obj)[0]]}</option>
                ))}
              </CFormSelect>
            }
            {/* Code block for start date and end date with type = date and dynamic id generated on construction 
          
          onChange call the function searchWithDate()
          */}
          </div>
          <div className='col-6'></div>
          <div className='col-3'>
            {parameters.show_export === "none" &&

              <CButtonGroup role="group" style={{ "float": "right" }} size='sm' aria-label="Basic outlined example">
                <CButton color="primary" variant="outline">PDF</CButton>
                <CButton color="primary" variant="outline">CSV</CButton>
                <CButton color="primary" variant="outline">JSON</CButton>
              </CButtonGroup>
            }
          </div>

        </div>

        <CTable responsive striped>
          <CTableBody id='data-table'>


            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className='card p-3'>
                    <form id='league-add-form'>
                    {/* <h3><b>Banner</b></h3>
                        <hr /> */}
                        <CFormLabel ><b>Banner Image</b></CFormLabel><br></br>
                        <img alt='none' className='pb-3'
                          src="https://picsum.photos/200"/>
                           <hr />
                      <div className="mb-3">
                        <CFormLabel ><b>CTA link</b></CFormLabel>
                        <CFormControl type="text" id="CTA_link" maxLength={20} placeholder="CTA link" required />
                      </div>
                      {/* <div className="mb-3">
                        <CFormLabel ><b>Code</b></CFormLabel>
                        <CFormControl type="text" id="league_name" maxLength={20} placeholder="Enter Code" required />
                      </div>
                      <div className="mb-3">
                        <CFormLabel ><b>Max Entry</b></CFormLabel>
                        <CFormControl type="text" id="league_name" maxLength={20} placeholder="Enter Max Entry" required />
                      </div>
                      <div className="mb-3">
                        <CFormLabel ><b>Total Used</b></CFormLabel>
                        <CFormControl type="text" id="league_name" maxLength={20} placeholder="Total Used" required />
                      </div> */}






                      <div className="row mb-3">
                        <div className="d-grid gap-2 d-md-block" >
                          <CButton id='save-button' color="success" onClick={edit_banner} >Edit Banner</CButton>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="d-grid gap-2 d-md-block">
                          <CButton id='save-button' style={{ float: 'right' }} color="success" onClick={copy_battle} >Deactive</CButton>
                        </div>
                      </div>

                      <CAlert color="danger" id='form-error' style={{ 'display': 'none' }}></CAlert>
                      <CAlert color="success" id='form-success' style={{ 'display': 'none' }}></CAlert>
                    </form>

                  </div>

                </div>
              </div>
            </div>
          </CTableBody>
        </CTable>

        {/* <CPagination size='sm' aria-label="Page navigation example">
        {
        paginations.map((page,key)=>(
        <CPaginationItem key={key} onClick={()=>paginate(page)}>{page}</CPaginationItem>

        ))
        }
      </CPagination> */}

      </div>


    </>

  );
}

export default DataTableBanner