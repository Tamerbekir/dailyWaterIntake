import { useState } from "react"

export function Settings() {

  const [userWeight, setUserWeight] = useState({
    userWeightInfo: ''
  })

  const [saveWeight, setSaveWeight] = useState(() => {
    const storedWeight = localStorage.getItem('userWeight')
    return storedWeight ? JSON.parse(storedWeight) : []
  })

  const handleUserWeight = (event) => {
    const { name, value } = event.target
    setUserWeight({
      ...userWeight,
      [name]: value
    })
    console.log(userWeight)
  }

  const handleUserWeightSave = () => {
    const updatedWeight = [...saveWeight,
    {
      userWeightInfo: userWeight.userWeightInfo
    }]
    setSaveWeight(updatedWeight)
    localStorage.setItem('userWeight', JSON.stringify(updatedWeight))
    setUserWeight({
      userWeightInfo: ''
    })
  }

  const handleDeleteWeight = (index) => {
    const updatedWeight = [...saveWeight]
    updatedWeight.splice(index, 1)
    setSaveWeight(updatedWeight)
    localStorage.setItem('userWeight', JSON.stringify(updatedWeight))
  }


  return (
    <div >
      <h1>Settings</h1>
      <div className="waterConsumption-weightlb-saveBtn">
        <p>Your daily water depends on your weight (lb). Adjust your daily water intake below to tailor it to your needs.</p>
        <div>
          <input
            name='userWeightInfo'
            onChange={handleUserWeight}
            value={userWeight.userWeightInfo}
            type="text"
            placeholder="Enter weight..."
          />
          <button onClick={handleUserWeightSave}>Save</button>
        </div>
        <div>
          <div>
            {saveWeight.map((weight, index) => (
              <div>
                <p key={index}> {weight.userWeightInfo} lb should consume about {Math.round(weight.userWeightInfo * 0.25)} oz of water daily</p>
                <button onClick={() => handleDeleteWeight(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}