
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteSub } from "../../store/subs";


import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


import './subs_list.css'

const GET_ALL_SUBS = "subs/GET_ALL_SUBS"




const SubsList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const dispatch = useDispatch();


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

    const columns = [
      {
        field: 'num', headerName: 'Num', type: 'number', width: 90,
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
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button variant="outlined"
          onClick={
            () => handleDelete(params.id)
            }
            >
            Unsubscribe
          </Button>
        ),
      },  ];

    const rows = subscribers.map((subscriber, index) => {

      return {
          id: subscriber.id,
          num: index + 1,
          email: subscriber.email_address,
          fullName: subscriber.full_name,
          source: subscriber.source,
          signupDate: subscriber.timestamp_opt.slice(0,10),
          open: subscriber.stats.avg_open_rate,
          click: subscriber.stats.avg_click_rate,
          status: subscriber.status,
          
      };
  });
  
  const handleMailchimpLogin = () => {
      window.location.href = 'https://login.mailchimp.com/';
  };

  const handleAddSub = () => {
    window.location.href = 'https://gmail.us21.list-manage.com/subscribe/post?u=521869c3a8a0a0f310a967b1e&amp;id=8b0b556b44&amp;f_id=0000e9e6f0';
};

  const handleDelete = async (id) => {
    dispatch(thunkDeleteSub(id));
    window.location.reload();
  };

  return (
    <div>
      <h4 className='sub-title'>All Subscribers</h4>
      <div className='subs-container'>
          <div className='subs-button'>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleMailchimpLogin}>
                    Mailchimp Dashboard
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddSub}>
                    Add Subscriber
              </Button>
            </ButtonGroup>
          </div>

          <div className='subs-table' style={{ height: 650, width: '100%' }}>
              <DataGrid 
                  rows={rows}
                  columns={columns}
                  initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                  },
                  }}
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                  // checkboxSelection
              />
          </div>

          
    </div>     
  </div> 
  );
};

export default SubsList;



