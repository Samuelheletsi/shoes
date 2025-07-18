import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

  function Read() {
    const {id} = useParams();
    const [student, setStudent] = useState([])


    useEffect(()=>{
         axios.get('http://localhost:5500/read/'+id)
         .then(res =>{
             console.log(res)
             setStudent(res.data[0]);

         })
         .catch(err => console.log(err))
    }, [])
  return (
     <div className='container vh-100 d-flex justify-content-center align-items-center bg-primary'>
      <div className='col-12 col-md-8 bg-white rounded p-3'>
        <div className='p-2'>
             <h2 className='text-center mb-4'>Student Details</h2>
             <h2>{student.id}</h2>
             <h2>{student.name}</h2>
             <h2>{student.email}</h2>
        </div>
        <Link to="/" className='btn btn primary me-2'>Back</Link>
        {/* <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link> */}
         
      </div>
</div>
  )
}


export default Read;