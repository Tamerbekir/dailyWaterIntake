import { useState } from 'react'

export function Home() {
  const [errorMessage, setErrorMessage] = useState(false)
  const [count, setCount] = useState(0)
  const [save, setSave] = useState(() => {
    const storedSave = localStorage.getItem('waterConsumption')
    return storedSave ? JSON.parse(storedSave) : []
  })


  const currentDate = new Date()

  const formattedDateDay = currentDate.toLocaleString('en-US', {
    // hour: '2-digit',
    // minute: '2-digit',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    date: 'numeric',
    // hour12: true
  })

  const formattedDateTime = currentDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    // year: 'numeric',
    // month: 'numeric',
    // day: 'numeric',
    // date: 'numeric',
    hour12: true
  })

  // const [liquid, setLiquid] = useState({
  //   liquidName: ''
  // })

  const handlePlusClick = () => {
    setCount(count + 1)
  }

  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1)
    } else {
      setCount(0)
    }
  }

  const handleWaterConsumptionSave = () => {
    if (count === 0) {
      setErrorMessage(true)
    } else {
      const updatedSave = [...save,
      {
        count: count,
        // liquidName: liquid.liquidName,
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
      }]
      setSave(updatedSave)
      localStorage.setItem('waterConsumption', JSON.stringify(updatedSave))
      setCount(0)
      //   setLiquid({
      //     liquidName: ''
      // })
      setErrorMessage(false)
    }
  }

  const handleReset = () => {
    setSave([])
    localStorage.removeItem('waterConsumption')
    setCount(0)
    setErrorMessage(false)
  }

  // const handleLiquidName = (event) => {
  //   const { name, value } = event.target
  //   setLiquid({
  //     ...liquid,
  //     [name]: value
  //   })
  // }

  const handleDelete = (index) => {
    const updatedSave = [...save]
    updatedSave.splice(index, 1)
    setSave(updatedSave)
    localStorage.setItem('waterConsumption', JSON.stringify(updatedSave))
  }

  return (
    <div className="waterConsumption">
      <h1 className="waterConsumption-title">Daily Water</h1>
      <p className="waterConsumption-count">{count} oz</p>
      <button className="waterConsumption-button-plus" onClick={handlePlusClick}>+</button>
      <button className="waterConsumption-button-minus" onClick={handleMinusClick}>-</button>
      <button className="waterConsumption-button-save" onClick={handleWaterConsumptionSave}>Save</button>
      <button className="waterConsumption-button-reset" onClick={handleReset}>Start New Day</button>
      <div className="waterConsumption-button-reset-container">
      </div>
      <div>
        {/* <input
          className='liquidNameInput'
          name='liquidName'
          placeholder='Liquid..'
          value={liquid.liquidName}
          onChange={handleLiquidName}
          /> */}
        <p className="waterConsumption-total-amount"> Daily Total: {save.reduce((total, item) => total + item.count, 0)} oz</p>
        <p className="waterConsumption-total">{localStorage.getItem('waterConsumption') !== null ? formattedDateDay : ""}</p>

      </div>
      <div>
        {errorMessage && <p className="errorMessage">Missing Entry</p>}
      </div>
      <div className="daily-water-div">
        {save.map((num, index) => (
          <div key={index}>
            <p className="waterConsumption-count-save">{num.count} oz</p>
            <p className="waterConsumption-date-save">{num.dateTime}</p>
            {/* <p className="waterConsumption-liquid-name-save">{num.liquidName}</p> */}
            <span className="material-symbols-outlined" onClick={() => handleDelete(index)}>
              delete
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
