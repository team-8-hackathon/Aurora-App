
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
import Button from '@mui/material/Button';

import './subs_list.css'

const GET_ALL_SUBS = "subs/GET_ALL_SUBS"

const columns = [
    {
      field: 'id', headerName: 'ID', type: 'number', width: 90,
    },
    { 
      field: 'email', headerName: 'Email', width: 400 },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: true,
      width: 200,
    },
    { field: 'source', headerName: 'Source', width: 200 },
    { field: 'signupDate', headerName: 'Signup Date', width: 150 },
    { field: 'open', headerName: 'Open Rate', width: 150 },
    { field: 'click', headerName: 'Click Rate', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 }
  ];

// const rows = [

//     { id: 1, fullName: 'Snow', email: 'Jon', age: 35 },
//     { id: 2, fullName: 'Lannister', email: 'Cersei', age: 42 },


// ];

const SubsList = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
      const fetchSubscribers = async () => {
        try {
          const response = await fetch('/api/subs/');
          if (response.ok) {
            const subscribers = await response.json();
            const subs = subscribers["members"]
            setSubscribers(subs)
          } else {
            throw new Error('Failed to fetch subscribers');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchSubscribers();
    }, []);

    const rows = subscribers.map((subscriber, index) => {
      return {
          id: index + 1,
          email: subscriber.email_address,
          fullName: subscriber.full_name,
          source: subscriber.source,
          signupDate: subscriber.timestamp_opt.slice(0,10),
          open: subscriber.stats.avg_open_rate,
          click: subscriber.stats.avg_click_rate,
          status: subscriber.status
      };
  });

  
  const handleMailchimpLogin = () => {
      window.location.href = 'https://login.mailchimp.com/';
  };

  return (
    <div className='browse-blogs-container'>
        <h4 className='sub-title'>All Subscribers</h4>
        <Button variant="contained" color="primary" onClick={handleMailchimpLogin}>
            Mailchimp Dashboard
        </Button>

        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                // checkboxSelection
            />
        </div>

        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Full Name</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Actions</TableCell>         
                    </TableRow>
                </TableHead>
                <TableBody>
                  {subscribers.map((subscriber, index) => (
                      <TableRow>
                      <TableCell align="left" key={index}>{index + 1}</TableCell>
                      <TableCell align="left" >{subscriber["email_address"]}</TableCell>
                      <TableCell align="left" key={index}>{subscriber["full_name"]}</TableCell>
                      <TableCell align="left" key={index}>{subscriber["status"]}</TableCell>
                      <Button variant="outlined">Delete</Button>
                      </TableRow>
                  ))}
                  </TableBody>
            </Table>
        </TableContainer> */}
  </div>      
  );
};

export default SubsList;



