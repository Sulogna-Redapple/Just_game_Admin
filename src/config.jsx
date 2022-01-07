export const base_url = '';
export const api_url ='http://3.109.149.116:3000/api/';

export let axios = require('axios').default;
axios.defaults.headers.common['authorization'] = 'Bearer '+localStorage.getItem('token');

// Middleware
axios.interceptors.response.use(function(resp){

    if(resp.config.url.includes("transactions/"))
    {
        resp.data.data.forEach(element=>{
            if(element.transaction_type === 1){
                element.debit = element.transaction_value
            }
            else{
                element.credit = element.transaction_value
            }
            element.created_at = String(new Date(element.created_at).toLocaleString())
        })
    }
    else if(resp.config.url.includes("payment") && resp.config.method === "get")
    {
        resp.data.data.forEach(element=>{
            // if(element.transaction_type === "1"){
            //     element.debit = element.amount
            // }
            // else{
            //     element.credit = element.amount
            // }
            element.updated_at = String(new Date(element.updated_at).toLocaleString("en-GB"))
        })
    }
    else if(resp.config.url.includes("leagues") && resp.config.method === "get"){ 
        resp.data.data.forEach(element=>{
            element.start_time = String(new Date(element.start_time*1000).toLocaleString("en-GB"))
            element.end_time = String(new Date(element.end_time*1000).toLocaleString("en-GB"))
        
            element.startDate = new Date(element.start_time.split(', ')[0])

            
            element.startTime =  element.start_time.split(', ')[1]

            element.endDate = new Date(element.end_time.split(', ')[0])
            
            element.endTime =  element.end_time.split(', ')[1]
            console.log("ixme:", element.startTime, element.endTime)
        })
    }
    else if(resp.config.url.includes("admin-earning") && resp.config.method === "get"){
        resp.data.data.forEach(element=>{
            // if(element.transaction_type === "1"){
            //     element.debit = element.amount
            // }
            // else{
            //     element.credit = element.amount
            // }
            element.updated_at = String(new Date(element.updated_at).toLocaleString("en-GB"))
        })

    }
    return Promise.resolve(resp)

    }, function(err){
    if(err.status === 401){
        window.location.href = '#/login'
        ```
        code block for refresh token
        ```
        // Validity of Access Token 
        // If access token not valid, then set a dirty bit to 1
        // Request for new access token with the previous refresh token 
        // check any of the api with the new access token, 
        // if still 401, then logout the user and change the dirty bit to 0 else change the dirty bit to 0


        return Promise.reject(err) 
    }
    // else if(err.status === 500){
    //     window.location.href = '#/500'

    // }
    else{
        // window.location.href = '#/login'

        return Promise.reject(err)
    }
})
