
import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,BarElement);

export default function Dashboard(){

const data={
labels:["Enero","Febrero","Marzo"],
datasets:[{label:"Ventas",data:[2000,4000,8000]}]
};

return(
<div>
<h2>Dashboard Estadístico</h2>
<Bar data={data}/>
</div>
);

}
