import {Chart, registerables} from './npm/chart.js@4.4.3.js'

export function makeChart() {
  Chart.register(...registerables)

  const labels = Array.from(document.querySelectorAll('tbody > tr > td:first-child'))
    .map((x) => x.innerText)
  const datasetData = Array.from(document.querySelectorAll('tbody > tr > td:nth-child(2)'))
    .map(x => x.innerText)
    .map(x => x.replaceAll(/\D/g, ''))
    .map(x => parseInt(x))
  const data = {
    labels: labels,
    datasets: [{
      label: 'Nombre de messages sur les forums de jeuxvideo.com',
      data: datasetData,
      fill: true,
      borderColor: 'OrangeRed',
      tension: 0.1
    }]
  }

  const ctx = document.getElementById('myChart')
  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  new Chart(ctx, config)
}
