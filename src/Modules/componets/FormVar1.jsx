// import { CButton } from '@coreui/react';
// import React from 'react';

// import {
// CAlert,
// CFormSelect,
// CFormLabel,
// CFormControl,

// } from '@coreui/react'
// import {api_url} from '../../config'

// const FormVar1= (props) => {
//     const axios = require('axios').default;    

//     const check_required = (required) =>{
//         if (required === true){
//             return <span style={{'color':'red'}}> *</span>
//         }
//     }
//     const validate = () =>{
//         let success = true
//         props.params.fields.forEach((field, index)=>{
//             if(field.required === true && document.getElementById(field.id).value === ''){
//                 document.getElementById(field.id).style.border = "2px solid red";
//                 document.getElementById(field.id+'-error').style.display = "block";
//                 document.getElementById(field.id+'-error').innerHTML = '<span style="color:red"><b>'+field.label + "</b> cannot be blank</span>"
//                 success = false;
//             }
//             else{
//                 document.getElementById(field.id).style.border = "1px solid var(--cui-input-border-color, #b1b7c1)";
//                 document.getElementById(field.id+'-error').style.display = "none";
//             }

//         })
//         return success    
//     }
//     const process_form = ()=>{
//         let result = validate();
//         if (result === true){
//             var data = new FormData();
//             let fields = props.params.fields
//             for(let i in fields){
//                     let val =document.getElementById(fields[i].id).value;
//                     data.append(fields[i].api_url, val)
//             }   
//         }
//         var config = {
//             method: props.params.api_method,
//             url: api_url+props.params.api_url,
//             data : data
//         };
    
//         axios(config).then((resp)=>{
//             document.getElementById('form-success').style.display='block';
//             document.getElementById('form-success').innerHTML = resp;
//         }).catch((err)=>{
//             console.log(err)
//         })

//     }



// return (
// <>
//     <h1 className='display-2'>{props.params.form_name}</h1>

//     <div className='container'>
//         <div className='row'>
//             <div className='col-12'>
//                 <div className='card p-3'>
//                     <form id='league-add-form'>
//                         {
//                             props.params.fields.map((inp_obj)=>(

//                             <div className="mb-3">
//                                 <CFormLabel >
//                                     <b>{inp_obj.label}{check_required(inp_obj.required)}</b>
//                                 </CFormLabel>
                                
//                                 {/* If Input type is not SELECT */}
//                                 {inp_obj.type !== 'select'  &&                    
//                                     <CFormControl 
//                                         type={inp_obj.type} 
//                                         id={inp_obj.id} 
//                                         placeholder={inp_obj.placeholder} 
//                                         required={inp_obj.required} />                                    
//                                 }

//                                 {/* If Input type is SELECT */}
//                                 {inp_obj.type === 'select' &&
//                                     <CFormSelect id={inp_obj.id} required={inp_obj.required}>
//                                         {inp_obj.choices.map((choice)=>(
//                                             <option value={choice[0]}>{choice[1]}</option>
//                                             ))
//                                         }
//                                     </CFormSelect>
//                                 }
//                                 <div id={inp_obj.id+'-error'} style={{'display':'none'}}></div>
//                             </div>
//                             ))
//                         }
//                             <div className="row mb-3">
//                             <div className="d-grid gap-2 d-md-block">
//                                 <CButton id='save-button'  onClick={process_form}  color="primary" >Save League</CButton>
//                             </div>
//                         </div>
//                         <CAlert color="success" id='form-success' style={{'display':'none'}}></CAlert>
//                         </form>

//                 </div>

//             </div>
//         </div>
//     </div>

// </>
// )
// }


// export default FormVar1