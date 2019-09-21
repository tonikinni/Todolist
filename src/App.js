import React, { useState, useEffect } from 'react'

const Button = (props) => (
  <button id={props.id} onClick={props.handleClick}>{props.text}</button>
)

const ItemAdd = (props) => (
  <>
    <div>Item:<input value={props.name} onChange={props.handleChange} /></div>
    <br/>
    <Button id="add" handleClick={props.handleClick} text="Add to list" />
  </>
)

const App = () => {
  const [items, setItems] = useState(['Example 1', 'Example 2'])
  const [itemName, setItemName] = useState('')
  
  useEffect(() => {
    const itemString = window.localStorage.getItem('TodoAppList')
    if (itemString) {
      setItems(itemString.split(','))
    }
  }, [])

  const rows = () => items.map((i, x) => <li key={x}>{i} <Button id={i} handleClick={handleDeleteClick} text="Delete" /></li>)

  const handleAddClick = (event) => {
    if(!itemName || itemName.length === 0) {
      alert('Fill the item detail')
      return
    }
    if(items.find(i => i.toLowerCase() === itemName.toLowerCase())){
      alert(`${itemName} is already on the list!`)
      return
    }

    setItems(items.concat(itemName))
    window.localStorage.setItem('TodoAppList', items.concat(itemName).join())
    setItemName('')
  }

  const handleChange = (event) => {
    setItemName(event.target.value)
  }
  
  const handleDeleteClick = (event) => {
    const item = items.find(i => i === event.target.id)
    if(item){
      setItems(items.filter(i => i !== item))
      window.localStorage.setItem('TodoAppList', items.filter(i => i !== item))
    }
  }

  return (
    <div>
      <div><ItemAdd handleClick={handleAddClick} name={itemName} handleChange={handleChange} /></div>
      <h2>TODO list</h2>
      <ul>{rows()}</ul>
    </div>
  )
}

export default App