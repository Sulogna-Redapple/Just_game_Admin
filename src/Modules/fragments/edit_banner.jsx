import { CButton } from '@coreui/react';
import { React, useState } from 'react';
import {
    CAlert,
    CFormSelect,
    CFormLabel,
    CFormControl,
    CTable,
    CTableBody

} from '@coreui/react'
import { api_url, axios } from '../../config'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Add_Coupon = (props) => {
    let error_flag = 0
    let error_list = []

    // eslint-disable-next-line
    Date.prototype.getUnixTime = function () { return this.getTime() / 1000 | 0 };
    var FormData = require('form-data');

    const throw_error = (err) => {
        error_list.push(err)
    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const show_error = () => {
        let errors = 'Please fill up the following fields: <br/><ul>'
        for (let i in error_list) {
            errors += '<li>' + error_list[i] + '</li>'
        }
        errors += '</ul>'
        const form_error_area = document.getElementById('form-error');
        form_error_area.style.display = 'block'
        form_error_area.innerHTML = errors;
        document.getElementById('save-button').innerHTML = 'Save';
    }

    const disablePastDate = () => {
        const today = endDate;
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const edit_battle = function () {
        alert("HIE")
        window.location.href = "/#/edit_battle";
    };
    const add_league = () => {
        error_flag = 0;
        error_list = [];

        document.getElementById('save-button').innerHTML = 'Loading ...';
        let league_name = document.getElementById('league_name').value;
        if (league_name === '') {
            throw_error("League Name cannot be blank");
            error_flag = 1;
        }
        let game_id = document.getElementById('game_id').value;
        if (game_id === "0") {

            throw_error("Game cannot be blank");
            error_flag = 1;
        }

        // Fixme start and enddate needs convertion to unix timestamp
        let start_date = document.getElementById('start_date').value;
        if (start_date === '') {
            throw_error("Start date cannot be blank");
            error_flag = 1;
        }
        let end_date = document.getElementById('end_date').value;
        if (end_date === '') {
            throw_error("End date cannot be blank");
            error_flag = 1;
        }

        if (end_date < start_date) {
            throw_error("End date cannot be less than start date");
            error_flag = 1;
        }

        let start_time = document.getElementById('start_time').value;
        if (start_time === '') {
            throw_error("Start time cannot be blank");
            error_flag = 1;
        }
        let end_time = document.getElementById('end_time').value;
        if (end_time === '') {
            throw_error("End time cannot be blank");
            error_flag = 1;
        }

        const start_datetime = new Date(start_date + ' ' + start_time).getTime() / 1000
        const end_datetime = new Date(end_date + ' ' + end_time).getTime() / 1000

        // const end_datetime = Math.floor((new Date(end_date+' '+end_time))/100)
        if (start_datetime >= end_datetime) {
            throw_error("End time cannot be equal or less than to start time");
            error_flag = 1;
        }

        let entry_fee = document.getElementById('entry_fee').value;
        if (entry_fee === '') {
            throw_error("Entry Fee cannot be blank");
            error_flag = 1;
        }

        // let min_player = document.getElementById('min_player').value;
        // if (min_player === ''){
        //     throw_error("Min Player cannot be blank");
        //     error_flag = 1;
        // }
        let max_player = document.getElementById('max_player').value;
        if (max_player === '') {
            throw_error("Max Player cannot be blank");
            error_flag = 1;
        }
        let league_details = document.getElementById('league_details').value;

        let track_type = document.getElementById('track_type').value;
        if (track_type === "0") {
            throw_error("Track Type cannot be blank");
            error_flag = 1;
        }

        // let status = document.getElementById('status').value;
        // if (status === ''){
        //     throw_error("Status cannot be blank");
        //     error_flag = 1;
        // }

        let prize_distribution_note = document.getElementById('prize_distribution_note').value;

        let jackpot_note = document.getElementById('jackpot_note').value;

        const league_image_elem = document.getElementById('league_image')
        const league_image = league_image_elem.files[0]
        console.log("league_image", league_image)
        if (league_image == null) {
            throw_error("League Image cannot be blank");
            error_flag = 1
        }
        const league_image_type = document.getElementById('league_image').value

        let splitImage = league_image_type.split('.')

        if (league_image != undefined) {

            if (((splitImage[1]) !== 'jpg')) {

                if (((splitImage[1]) !== 'png')) {
                    if (((splitImage[1]) !== 'jpeg')) {
                        throw_error("File types allowed: png, jpeg, jpg.");
                        error_flag = 1
                    }

                }
            }
        }

       

        let level_id = document.getElementById('level_id').value;
        if (level_id === "0") {
            throw_error("Level cannot be blank");
            error_flag = 1;
        }

        
        let no_of_laps = document.getElementById('no_of_laps').value;
        if (no_of_laps === '') {
            throw_error("No of Laps cannot be blank");
            error_flag = 1;
        }


        if (error_flag === 1) {
            show_error()
        }
        else {
            var data = new FormData();
            data.append('league_image', league_image, league_image.name)
            data.append('game_id', game_id);
            // data.append('league_availibility', league_availibility);
            data.append('start_time', start_datetime);
            data.append('end_time', end_datetime);
            data.append('level_id', level_id);
            data.append('entry_fee', entry_fee);
            // data.append('total_prize_value', '1');
            // data.append('platform_commission_percentage', platform_commission_percentage);
            // data.append('winning_amount', winning_amount);
            data.append('max_player', max_player);
            // data.append('min_player', min_player);
            // data.append('admin_earning', '4');
            data.append('league_details', league_details);
            data.append('track_type', track_type);
            // data.append('mode', mode);
            // data.append('status', '1');
            data.append('prize_distribution_note', prize_distribution_note);
            data.append('jackpot_note', jackpot_note);
            data.append('league_name', league_name);
            data.append('no_of_laps', no_of_laps);
            var config = {
                method: 'post',
                url: api_url + 'admin/leagues',
                data: data
            };

            console.log(data)

            axios(config).then((resp) => {
                document.getElementById('save-button').innerHTML = 'Save';

                console.log("ERRE", resp.Error)
                if (resp.status === 200) {

                    document.getElementById('league-add-form').reset()
                    document.getElementById('form-error').style.display = 'none';
                    document.getElementById('form-success').style.display = 'block';
                    document.getElementById('form-success').innerHTML = 'League has been added successfully!';
                    // window.location.href="/#/leagues"
                    // window.location.href = "/#/players";
                    window.location.reload();
                }
                else if (resp.status === 500) {
                    document.getElementById('form-error').style.display = 'block';
                    document.getElementById('form-error').innerHTML = resp.data
                }
                else if (resp.status === 401) {
                    console.log("JWT needs to be refreshed")
                }


            })
        }
    }
  

    return (
        <>

            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card p-3'>
                            <form id='league-add-form'>
                                <h3><b>Edit Banner</b></h3>
                                <hr />

                                <CTable responsive striped>
                                    <CTableBody id='data-table'>


                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='card p-3'>
                                                        <form id='league-add-form'>
                                                        <CFormLabel ><b>Banner Image</b></CFormLabel>
                                                            <img alt='none' className='pb-3'
                                                                src="https://picsum.photos/200" />
                                                            <hr />
                                                            <div className="mb-3">
                                                                <CFormLabel ><b>CTA link</b></CFormLabel>
                                                                <CFormControl type="text" id="CTA_link" maxLength={20} placeholder="CTA link" required />
                                                            </div>
                                                            {/* <div className="row mb-3">
                                                                <div className="d-grid gap-2 d-md-block" >
                                                                    <CButton id='save-button' color="success" onClick={edit_battle} >Edit Coupon</CButton>
                                                                </div>
                                                            </div> */}

                                                            <CAlert color="danger" id='form-error' style={{ 'display': 'none' }}></CAlert>
                                                            <CAlert color="success" id='form-success' style={{ 'display': 'none' }}></CAlert>
                                                        </form>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </CTableBody>
                                </CTable>
                                <div className="row mb-3">
                                    <div className="d-grid gap-2 d-md-block">
                                        <CButton id='save-button' onClick={add_league} style={{ float: 'right' }} color="success" >Save Coupon</CButton>
                                    </div>
                                </div>

                                <CAlert color="danger" id='form-error' style={{ 'display': 'none' }}></CAlert>
                                <CAlert color="success" id='form-success' style={{ 'display': 'none' }}></CAlert>
                            </form>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}


export default Add_Coupon