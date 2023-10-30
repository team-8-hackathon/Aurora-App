
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setConfig, lists } from "@mailchimp/mailchimp_marketing";
const GET_ALL_SUBS = "subs/GET_ALL_SUBS"


const SubsList = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/subs/');
            if (response.ok) {
              const subscribers = await response.json();
              console.log('Subscribers:', subscribers);
              setSubscribers(subscribers)
            } else {
              throw new Error('Failed to fetch subscribers');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchSubscribers();
      }, []);
    
      return (
        <div>
        <h2>List of Subscribers</h2>
        <ul>
          {subscribers.map((subscriber, index) => (
            <li key={index}>{subscriber}</li>
          ))}
        </ul>
      </div>      
      );
    };

export default SubsList;



