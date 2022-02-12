import React, { useEffect, useState } from 'react';

    const Calendar = () => {

    useEffect(() =>{
        $('.datepicker').datepicker();
    });
    return (
        <DateInput/>
    );
    
}

export default  Calendar;