import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

    const {id} = useParams()
    const [firstName,setFirstName] = useState()
    const [secondName,setSecondName] = useState()
    const user = useSelector(state => state.user.value)
    const nav = useNavigate()

    const getInfo = async () => {
        const {data} = await axios.get(
            `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
            {
                headers : {
                    authorization : `Bearer ${user.token}`
                }
            }
        )
        setFirstName(data.contact.firstName)
        setSecondName(data.contact.secondName)
    }

    const updateInfo = async (userData) => {
        const {data} = await axios.patch(`http://go.contact.mmeducare.com/api/v1/contacts/${id}`,userData,
        {
            headers : {
                authorization : `Bearer ${user.token}`
            }
        }
        )

        // console.log(data)
        if (data) {
            nav('/dashboard')
        }
    }

    useEffect(() => {
        getInfo()
    },[])

   
    const handleSubmit = (e) => {
        e.preventDefault()
        updateInfo({firstName,secondName})
    }
 

  return (
    <div className='ps-5 pt-5'>
        <h1>Edit Contact Id - {id}</h1>
        <form className='w-25' onSubmit={handleSubmit}>
            <input defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className='form-control my-4' placeholder='First Name' />
            <input defaultValue={secondName} onChange={(e) => setSecondName(e.target.value)} type="text" className='form-control my-4' placeholder='Second Name' />
            <input  type="submit" className='form-control my-4 btn btn-success' placeholder='Second Name' />
        </form>
    </div>
  )
}

export default Edit