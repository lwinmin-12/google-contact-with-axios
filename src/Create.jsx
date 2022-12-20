import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Create = () => {

    const [firstName,setFirstName] = useState('')
    const [secondName,setSecondName] = useState('')
    const [email,setEmail] = useState('')
    const [file,setFile] = useState('')
    const [phone,setPhone] = useState('')
    const user = useSelector(state => state.user.value)
    const nav = useNavigate()




    const createApi = async () => {

        
        const formData = new FormData()
        formData.append('firstName',firstName)
        formData.append('secondName',secondName)
        formData.append('email',email)
        formData.append('phone',phone)
        formData.append('contactPhoto',file)

        console.log(formData)

        const {data} = await axios.post(
            'http://go.contact.mmeducare.com/api/v1/contacts',
            formData,
            {
                headers : {
                    authorization : `Bearer ${user.token}`
                }
            }
        )

            if (data.success) {
                nav('/dashboard')
            }

    }

    const handleSubmit = (e) => {
        console.log(email)
        e.preventDefault()

        createApi()


    }

  return (
    <form className='col-6 my-5' onSubmit={handleSubmit}>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" placeholder='First Name' className='form-control my-3' />
        <input value={secondName} onChange={e => setSecondName(e.target.value)} type="text" placeholder='Second Name' className='form-control my-3' />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' className='form-control my-3' />
        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder='Phone' className='form-control my-3' />
        <input onChange={e => setFile(e.target.files[0])} type="file" className='form-control my-3' />
        <input type="submit" value='submit' className='btn btn-primary my-3' />
    </form>
  )
}

export default Create