import React from "react"
import { Doughnut } from 'react-chartjs-2';
// import 'chartjs-adapter-moment';

const ChartGraph=({data})=>{
    return(
        <div>
    <Doughnut data={data}  key={Math.random()} />
        </div>
    )
}
export default ChartGraph;