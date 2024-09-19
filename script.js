import('./modules/table.js').then((table) => {
  table.populateTable()
})

import('./modules/chart.js').then((chart) => {
  chart.makeChart()
})
