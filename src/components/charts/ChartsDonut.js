import React from 'react'
import Highcharts from 'highcharts/highstock'
import  PieChart  from 'highcharts-react-official'



const chartsDonut = {
    title: {
      text: 'Categorias'
    },
    chart: {
      type: "pie"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: true,
        innerSize: "60%",
        dataLabels: {
          enabled: true
        }
    }
  }
}

export default chartsDonut