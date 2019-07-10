import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
   Fab,
   Paper,
   Table,
   Toolbar,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
   Typography,
   TableSortLabel
} from '@material-ui/core';

//================================================

const stableSort = (array, order, orderBy) => {
   const sort_func = getSortFunct(order, orderBy);
   return array.sort(sort_func);
};

const getSortFunct = (order, orderBy) => {
   if (order === 'asc') {
      return (a, b) => asc(a, b, orderBy);
   }
   return (a, b) => -asc(a, b, orderBy);
};

const asc = (a, b, orderBy) => {
   if (typeof a[orderBy] === 'string') {
      const smaller = a[orderBy].toLowerCase() <= b[orderBy].toLowerCase();
      return smaller ? -1 : 1;
   }
   return a[orderBy] - b[orderBy];
};

//================================================

const useStyles = makeStyles((theme) => ({
   tableWrapper: {
      overflowX: 'auto'
   },
   marginRight: {
      marginRight: theme.spacing(2)
   }
}));

//================================================

const SharedTable = (props) => {
   const classes = useStyles();
   const [order, setOrder] = useState('asc');
   const [orderBy, setOrderBy] = useState('calories');

   function handleRequestSort(property) {
      // Toggle if same, asc first for others
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   }

   return (
      <div>
         <Paper elevation={5}>
            <Toolbar>
               <Typography variant="h5" className={classes.marginRight}>
                  {props.title}
               </Typography>
               {/*--------------------------------*/}
               <Fab size="small" color="secondary" aria-label="Add">
                  <AddIcon />
               </Fab>
               {/*--------------------------------*/}
            </Toolbar>
            <div className={classes.tableWrapper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        {props.headRows.map((property) => (
                           <TableCell
                              key={property.id}
                              align={property.align}
                              sortDirection={
                                 orderBy === property.id ? order : false
                              }
                           >
                              <TableSortLabel
                                 active={orderBy === property.id}
                                 direction={order}
                                 onClick={() => handleRequestSort(property.id)}
                              >
                                 {property.label}
                              </TableSortLabel>
                           </TableCell>
                        ))}
                        {/*--------------------------------*/}
                        <TableCell align="center">Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {stableSort(props.rows, order, orderBy).map(
                        (row, index) => {
                           return (
                              <TableRow key={index}>
                                 {props.headRows.map((property, index) => (
                                    <TableCell
                                       key={index}
                                       align={property.align}
                                    >
                                       {row[property.id]}
                                    </TableCell>
                                 ))}
                                 {/*--------------------------------*/}
                                 <TableCell align="center">actions</TableCell>
                              </TableRow>
                           );
                        }
                     )}
                  </TableBody>
               </Table>
            </div>
         </Paper>
         <br />
      </div>
   );
};

export default SharedTable;
