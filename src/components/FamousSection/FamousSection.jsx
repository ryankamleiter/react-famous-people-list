import React, { useState } from 'react';
import './FamousSection.css';
import { useEffect } from 'react'
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  const fetchPeople = () => {
    axios({
      method: 'GET',
      url: '/api/people'
    }).then(response => {
      console.log('response data', response.data)
      setPeopleArray(response.data)
    }).catch(
      error => {
        console.log('error from server', error)
      }
      )
      // TODO: fetch the list of people from the server
    }

    useEffect( 
      fetchPeople, []
);

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database


      axios({
        method: 'POST',
        url: 'api/people',
        data: {
          name: famousPersonName,
          role: famousPersonRole
        }
      })
        .then(response => {
          console.log('response from server', response);
          fetchPeople();
          setPersonName('')
          setPersonRole('')
        })
        .catch(
          error => {
            console.log('error in server post ', error)
          }
        )
      }
    
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  

    return (
      
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map(person => (
            <li key={person.id}>{person.name} is famous for "{person.role}."</li>
          ))}
        </ul>
      </section>
      
    );
          }   

export default FamousSection;