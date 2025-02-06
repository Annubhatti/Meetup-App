import React, { useState } from 'react'
import Header from '../components/Header'

function Home() {
  const [selectEvent, setSelectedEvent] = useState("Both");
  return (
    <>
    <div className='container mt-3'>
      <Header />
      <div className='row'>
        <div className='col-md-6'>
        <h1 className='fw-bold'>Meetup Events</h1>
        </div>
        <div className='col-md-6'>
          <select className='float-end'>
            <option value="Select Event Type">Select Event Type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
            <option value="Both">Both</option>
          </select>
          
        </div>

        <div className='row mt-4'>
          <div className='col-md-4'>
            <div className='card border-0'>
              <img src="https://placehold.co/10x5" alt="" />
              <p>Thu jul 13 2023 </p>
              <h4 className='card-title'>
                Tech Conference
              </h4>
            </div>
          </div>
          
        </div>

      </div>
    </div>
    </>
  )
}

export default Home
