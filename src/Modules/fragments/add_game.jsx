import React from 'react';
import FormVar1 from '../componets/FormVar1';

const AddGame= (props) => {

const form_params= {
    "form_name":"Add Game",
    "api_url":"admin/games",
    "api_method":"POST",
    "fields":[
        {
            "label":"Game Name",
            "type":"text",
            "id":"name",
            "api_field":"name",
            "required":true,
            "placeholder":"Enter Game Name"
        },
        {
            "label":"Game Image",
            "type":"file",
            "id":"image",
            "api_field":"image",
            "required":true,            
            "placeholder":"Upload your file"

        },        
    ],
}
return (
<>
<FormVar1 params = {form_params}/>
</>
)
}


export default AddGame