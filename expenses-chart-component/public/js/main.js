import '../style/style.css';
import datas from './data.json';

const canvas = document.getElementById('chart');

const labels = datas.map(data => data.day);
const amounts = datas.map(data => data.amount);
const highest = amounts.indexOf(Math.max(...amounts));
let colors = [];
let hoverColors = [];

for (const index in labels) {
    if(index == highest){
        colors.push('#76b5bc');
    } else{
        colors.push('#ec775f');
    }
}
for (const color of colors) {
    hoverColors.push(color + 'd6');
}


new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        borderRadius: 5,
        borderSkipped: false,
        data: amounts
    }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        layout: {
            padding: {
                top: 10
            }
        },
      scales: {
        y: {
            display: false
        },
        x: {
            border:{
                display: false
            },
            grid: {
                display: false
            }
        }
      }
    }
});