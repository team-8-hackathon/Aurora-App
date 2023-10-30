
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

      const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef(null);
      const [selectedIndex, setSelectedIndex] = React.useState(1);
    
      const handleClick = () => {
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
      };
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
      return (
        <div className='browse-blogs-container'>
            <h4 className='sub-title'>All Subscribers</h4>
            <TableContainer component={Paper}>
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
                        <TableCell align="left" >{subscriber}</TableCell>
                        <TableCell align="left" key={index}>''</TableCell>
                        <TableCell align="left" key={index}>subscribed</TableCell>
                        <Button variant="outlined">Delete</Button>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>      
      );
    };

export default SubsList;



