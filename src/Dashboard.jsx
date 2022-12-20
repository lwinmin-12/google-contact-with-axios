import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from './service/userSlice'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
const Dashboard = () => {
  const user = useSelector(state => state.user.value)
  const [contacts,setContacts] = useState([])
  const dispatch = useDispatch()
  const [num,setNum] = useState(1)
  const [search,setSearch] = useState('')
  const nav = useNavigate()
  const handleLogout = (e) => {
    dispatch(logout(null))
    nav('/login')
  }

  console.log(num)

  const getContact = async () => {
    const {data} = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts?page=${num}`,
      {
        headers:{authorization : `Bearer ${user.token}`}
      }
    )
    setContacts(data.data)
    console.log(data)
  }

  const deleteContact = async (id) => {
    const {data} = await axios.delete(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      {
        headers:{authorization : `Bearer ${user.token}`}
      }
    )

    if (data.success) {
      getContact()
    }

  }

  const searchContact = async () => {
    const {data} = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts?search=${search}`,
      {
        headers:{authorization : `Bearer ${user.token}`}
      }
    )

    if (data) {
      setContacts(data?.data)
    }else{
      getContact()
    }

  }

  useEffect(() => {
    if (search.length) {
      searchContact()
    }else{
      getContact()
    }
  },[search])


  useEffect(() => {
    getContact()
  },[num])

  const prev = () => (
    num > 1 ? setNum(num - 1) : setNum(1)
  )

  const next = () => (
    !contacts.length == 0 && setNum(num + 1)
  )


  return (
    <div>
      <h1>Dashboard</h1>
      {/* <p>{user?.auth.name}</p> */}
      <NavLink to='/create' className='btn btn-outline-primary mx-5'>Create New Contact</NavLink>
      <button onClick={handleLogout} className='btn btn-danger'>logout</button>

      <input type="text" onChange={(e) => setSearch(e.target.value)} />
     
      <table className='table'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        {
        contacts.length == 0 && <h1>No Contact</h1>
      }
        <tbody>
          {
            contacts.map((i,index) => (
              <tr key={index}>
                <td><img width='30px' height='30px' src={i.contactPhoto} alt="" /></td>
                <td>{i.fullName}</td>
                <td>{i.email}</td>
                <td>{i.phone}</td>
                <td>
                  <button className='text-danger' onClick={() => deleteContact(i.id)}><AiFillDelete/></button>
                  <NavLink to={`/edit/${i.id}`}>
                  <button className='text-success'><AiFillEdit/></button>
                  </NavLink>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='d-flex '>
        <button className='btn btn-primary' onClick={prev}>prev</button>
          <p>{num}</p>
        <button className='btn btn-primary' onClick={next}>next</button>
      </div>
    </div>
  )
}

export default Dashboard