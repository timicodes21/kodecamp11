import React, { useState, useEffect } from 'react'
import { Container, Image, Row } from 'react-bootstrap'
import Spinner from './assets/spinner.gif'
import ErrorImg from './assets/errorImg.png'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetching data from API
    const uri = 'https://jsonplaceholder.typicode.com/users'
    fetch(uri)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setLoading(false);
        setData(data);
        setError(false)
      })
      .catch(err => {
        setLoading(false);
        setData(null);
        setError(true)
      })
  }, [])

  return (
    <Container className="py-5 container">
      <h1 className="text-warning">Users</h1>

      {loading && <div className='text-center p-5'>
        <Image src={Spinner} fluid />
      </div>}

      {error && <div className='text-center p-1'>
        <div>  
            <Image src={ErrorImg} fluid/>
            <p className="text-danger">Error fetching the data</p>
          </div>
      </div>}

      {data && <Row className="my-3">
        {
          data.map(user => (
            <div key={user.id} className="col-12 col-md-4">
              <div className="p-2 my-2 shadow-sm rounded bg-light">
                <div>
                  <p className="font-24 text-success fw-bold">{user.name}</p>
                </div>
                <div>
                  <p className="font-14 text-secondary">{user.company.catchPhrase}</p>
                </div>
                <div className="my-2">
                  <p className="font-18 text-secondary fw-bold">General Info</p>
                  <div>
                    <p className="text-black font-14">Username: <span className="text-primary">{user.username}</span></p>
                    <p className="text-black font-14">Email Address: <span className="text-primary">{user.email}</span></p>
                    <p className="text-black font-14">Address: <span className="text-primary">{user.address.street}, {user.address.suite}, {user.address.city}</span></p>
                    <p className="text-black font-14">Zip Code: <span className="text-primary">{user.address.zipcode}</span></p>
                    <p className="text-black font-14">Phone: <span className="text-primary">{user.phone}</span></p>
                    <p className="text-black font-14">Company: <span className="text-primary">{user.company.name}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Row>}
    </Container>
  )
}

export default App
