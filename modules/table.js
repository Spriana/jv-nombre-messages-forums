import {assert} from './assert.js'

export function populateTable() {
  renderDiff({column: columns.semesterDiff, comparedRow: -1})
  renderDiff({column: columns.yearDiff, comparedRow: -2})
  renderDiff({column: columns.year2Diff, comparedRow: -4})
  renderDiff({column: columns.year3Diff, comparedRow: -6})
  renderDiff({column: columns.year4Diff, comparedRow: -8})
  renderDiff({column: columns.year5Diff, comparedRow: -10})
}

const columns = {
  value: 2,
  semesterDiff: 3,
  yearDiff: 4,
  year2Diff: 5,
  year3Diff: 6,
  year4Diff: 7,
  year5Diff: 8,
}

function renderDiff({column, comparedRow}) {
  document.querySelectorAll(`table > tbody > tr > td:nth-child(${column})`).forEach(($semesterCell) => {
    const $currentValueCell = $semesterCell.parentElement.querySelector(`td:nth-child(${columns.value})`)
    assert($currentValueCell instanceof HTMLTableCellElement)

    const $row = $semesterCell.parentElement
    assert($row instanceof HTMLTableRowElement)
    let $previousRow = $row
    for (let i = 0; i > comparedRow && $previousRow; i--) {
      $previousRow = $previousRow.previousElementSibling
    }
    assert($previousRow instanceof HTMLTableRowElement || $previousRow === null)

    if ($previousRow === null) {
      return
    }

    const $previousValueCell = $previousRow.querySelector(`td:nth-child(${columns.value})`)
    assert($previousValueCell instanceof HTMLTableCellElement)

    const currentValue = parseInt($currentValueCell.innerText.replaceAll(/\s/g, ''))
    assert(!isNaN(currentValue))
    const previousValue = parseInt($previousValueCell.innerText.replaceAll(/\s/g, ''))
    assert(!isNaN(previousValue))

    const diff = (currentValue / previousValue) - 1
    assert(diff !== Infinity)

    const humaneDiff = Intl.NumberFormat('fr-FR', {style: 'percent', minimumFractionDigits: 1}).format(diff).replaceAll('-', '−')

    let classe = ''
    if (diff >= 0.001) {
      classe = 'gain'
    }
    if (diff <= -0.001) {
      classe = 'loss'
    }
    $semesterCell.innerHTML = `<span class="${classe}">${humaneDiff}</span>`
  })
}
