import React from 'react'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'

const Form = () => {
    const [users, setUsers] = useState([])

    const [buttonState, setButtonState] = useState("add")
  
    const [show, setShow] = useState("showTable")
  
    const [userInfo, setUserInfo] = useState({
      id: uuid(),
      name: "",
      age: "",
      disease: "",
      address: "",
    })
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setUserInfo((currInfo) => {
        return {
          ...currInfo,
          [name]: value
        }
      })
    }
  
    const addData = (user) => {
      setUsers((currUsers) => [...currUsers, userInfo])
      setUserInfo({
        id: uuid(),
        name: "",
        age: "",
        disease: "",
        address: "",
      }
    )
     
    }
  
    const deleteData = (id) => {
      setUsers((currUsers) => {
        return currUsers.filter((user) => {
          return user.id !== id
        })
      })
    }
  
    const startEditing = (user) => {
      setUserInfo(user)
      setButtonState("edit")
      setShow("showInput")
    }
  
    const cancelEditing = () => {
      setButtonState("add")
      setUserInfo({
        id: uuid(),
        name: "",
        age: "",
        disease: "",
        address: "",
      })
    }
    
  
    const updateData = () => {
      setUsers((currUsers) => {
        return currUsers.map((user) => {
          if (user.id === userInfo.id) {
            return userInfo
          }
          return user
        })
      })
      cancelEditing()
    }
    const viewInput = () => {
      setShow("showInput")
    }
    const viewTable = () => {
      setShow("showTable")
    }
  return (
    <div>
        <button onClick={viewInput}>Add Patient Details</button>
      {show === "showInput" ?
        (<div className='form'>
          <h1>Patient Form</h1>
          <label htmlFor="">Name:</label><br /><input type="text" required placeholder='Enter Patient Name' value={userInfo.name} name='name' onChange={handleChange} />
          <br />
          <label htmlFor="">Age:</label><br /><input type="number" required placeholder='Enter Patient Age' value={userInfo.age} name='age' onChange={handleChange} />
          <br />
          <label htmlFor="">Disease:</label><br /><input type="text" required placeholder='Enter patient Disease' value={userInfo.disease} name='disease' onChange={handleChange} />
          <br />
          <label htmlFor="">Address:</label><br /><input type="text" required placeholder='Enter Patient Address' value={userInfo.address} name='address' onChange={handleChange} />
          <br />
          {
            buttonState === "add" ? (
              <div>
                <button onClick={addData}>Add</button>
                <button style={{ marginLeft: "15px" }} onClick={viewTable}>View Details</button>
              </div>) :
              (
                <div className='buttonContainer'>
                  <button onClick={updateData}>update</button>
                  <button onClick={cancelEditing}>cancel</button>
                </div>
              )
          }
        </div>) :

        (<div className='tableData'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
               
                
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.disease}</td>
                    <td>{user.address}</td>
                    <td><button onClick={() => startEditing(user)}>Edit</button><button onClick={() => deleteData(user.id)}>Delete</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>)}
      
    </div>
  )
}

export default Form
