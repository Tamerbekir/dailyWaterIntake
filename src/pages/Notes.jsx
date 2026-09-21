import { useState } from 'react'

export function Notes() {

  const [notes, setNotes] = useState({ notes: '' });
  const [save, setSave] = useState(() => {
    const storedSave = localStorage.getItem('notes')
    return storedSave ? JSON.parse(storedSave) : []
  })
  const handleChangeNotes = (event) => {
    const { name, value } = event.target
    setNotes({
      ...notes,
      [name]: value
    })
    console.log(event)
  }

  const handleSaveNotes = () => {
    const updateNotes = [...save, notes]
    setSave(updateNotes)
    localStorage.setItem('notes', JSON.stringify(updateNotes))
    setNotes({ notes: '' })
  }

  const handleDelete = (index) => {
    const updatedSave = [...save]
    updatedSave.splice(index, 1)
    setSave(updatedSave)
    localStorage.setItem('notes', JSON.stringify(updatedSave))
  }


  return (
    <div>
      <h1>Notes</h1>
      <textarea
        className="notes"
        name="notes"
        value={notes.notes}
        onChange={handleChangeNotes}
        placeholder="Notes..."></textarea>
      <button className="notes-button" onClick={handleSaveNotes}>Save Notes</button>
      <div className="savedNotes">
        {save.map((notes, index) => (
          <div key={index}>
            <p>{notes.notes}</p>
            <span className="material-symbols-outlined" onClick={() => handleDelete(index)}>
              delete
            </span>
          </div>
        ))}
      </div>
    </div >
  )

}