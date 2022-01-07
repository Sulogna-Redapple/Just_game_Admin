import React,{useEffect, useState} from 'react';

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
CDropdown,
CDropdownToggle,
CDropdownItem,
CDropdownDivider,
CDropdownMenu,
} from '@coreui/react'

import {api_url,axios} from '../../../config'

function AddLeagueForm(props) {
  const parameters = props.props
  const [datas,setDatas] = useState([])
  const [paginations,setPaginations] = useState([])

  const [isMounting,setMounting] = useState(true)

  let no_of_pages = 0;
  let fetch_size = parameters.fetch_size;
  let pagination_config = []
  const mount = () => {
      axios.get(
        api_url+parameters.api_url + '?page=1&limit=' + fetch_size, 
          {
          }).then(res=>{
              no_of_pages = res.data.count/parameters.fetch_size;

              if (res.data.totalcount % parameters.fetch_size !== 0){
                no_of_pages += 1;
              }
              
              for (let i = 1; i <= no_of_pages; i++){ 
                pagination_config[i] = i;
              } 
              
              setPaginations(pagination_config)
              setDatas(res.data.data);
              }).catch(err=>{
                console.log(err)
            }
      )  
  }

  useEffect(() => {
    if (isMounting === true){
      mount();
      setMounting(false)
    }
  })


  const search_and_update = (searchKey) => {
    axios.get(api_url + parameters.api_url + '?page=1&limit=' + fetch_size + '&searchKey=' + searchKey, 
      {
        headers: {
          'Content-Type': 'application/json',
           authorization: 'Bearer '+localStorage.getItem('token')
      }
    }).then(res => {
      setDatas([...res.data.data])
    }).catch(err => {
      console.log(err)
    })
  }

  const paginate = (page) => {
    axios.get(api_url+parameters.api_url+'?page='+page+'&limit=10', 
      {
        headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer '+localStorage.getItem('token')}
      }).then(res => {
          setDatas([...res.data.data])
      }).catch(err => {
        console.log(err)
    })
  }

  const search = () => {
    search_and_update(document.getElementById('search-input').value)
  }

  const filter = () => {
    console.log(document.getElementById('filter-input').value);
  }
  return (
  <>
    <div className="container">
      <div className="row">
        <CCardHeader>
          <div className='row'>
            <div className="col-3">
              <b>Leagues</b>
            </div>
            <div className="col-5"></div>
            <div className="col-3">
              <CFormControl type="text" size="sm" id='search-input' onChange={search}
                placeholder="Search by league name ..." aria-label="sm input example" />
            </div>
            <div className="col-1">
              <a href="/#/add_league/1">
                <CButton color='dark' size='sm'>
                  + Add
                </CButton>
              </a>
            </div>
          </div>
        </CCardHeader>
      </div>
    </div>

    <div className="container p-3">

      <div className='row mb-3'>
        <div className='col-3'>
          <CDropdown variant="btn-group">
            <CDropdownToggle color="secondary" size="sm">
              Filter Leagues
            </CDropdownToggle>
            <CDropdownMenu size="sm" id='filter-input' onChange={filter}>
              <CDropdownItem>All Leagues</CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem>Past Leagues</CDropdownItem>
              <CDropdownItem>Present Leagues</CDropdownItem>
              <CDropdownItem>Upcoming Leagues</CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </div>
        <div className='col-6'></div>
        <div className='col-3'>
          <CButtonGroup role="group" style={{"float":"right"}} size='sm' aria-label="Basic outlined example">
            <CButton color="primary" variant="outline">PDF</CButton>
            <CButton color="primary" variant="outline">CSV</CButton>
            <CButton color="primary" variant="outline">JSON</CButton>
          </CButtonGroup>
        </div>
      </div>

      <CTable responsive striped>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            {
            parameters.headers.map(header=>(
            <CTableHeaderCell scope="col">{header}</CTableHeaderCell>
            ))
            }
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody id='data-table'>
          {
          datas.map(data =>(
          <CTableRow key={data[parameters.id_field]}>

            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            {parameters.api_fields.map(key=>(
            <CTableDataCell>{data[key]}</CTableDataCell>
            ))
            }
            <CTableDataCell>
              <a href={parameters.view_url + data[parameters.id_field]}>
                <CButton color='primary' size='sm' variant='outline'>view</CButton>
              </a>
            </CTableDataCell>
            <CTableDataCell>
              <a href="/#/add_league/1">
                <CButton color='primary' size='sm' variant='outline'>update</CButton>
              </a>
            </CTableDataCell>

          </CTableRow>
          ))
          }

        </CTableBody>
      </CTable>

      <CPagination size='sm' aria-label="Page navigation example">
        {
        paginations.map(page=>(
        <CPaginationItem onClick={()=>paginate(page)}>{page}</CPaginationItem>

        ))
        }
      </CPagination>

    </div>


  </>

  );
  }

  export default AddLeagueForm