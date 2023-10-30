
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { setConfig, lists } from "@mailchimp/mailchimp_marketing";
import './subs_list.css'

const GET_ALL_SUBS = "subs/GET_ALL_SUBS"


const SubsList = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/subs/');
            if (response.ok) {
              const subscribers = await response.json();
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
        <div className='browse-blogs-container'>
            <h4 className='sub-title'>All Subscriber</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Full Name</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {subscribers.map((subscriber, index) => (
                        <TableRow>
                        <TableCell align="right" key={index}>{index + 1}</TableCell>
                        <TableCell align="right" key={index}>{subscriber}</TableCell>
                        <TableCell align="right" key={index}></TableCell>
                        <TableCell align="right" key={index}>subscribed</TableCell>
                        <TableCell align="right" key={index}>Delete</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>      
      );
    };

export default SubsList;



