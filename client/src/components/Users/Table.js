import React, { useState } from 'react';
import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

//================================================

const UsersTable = (props) => {
   const [order, setOrder] = useState('asc');
   const [orderBy, setOrderBy] = useState();

   function handleRequestSort(property) {
      // Toggle if same, asc first for others
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   }

   return (
      <Table>
         <TableHead>
            <TableRow>
               {props.headRows.map((property) => (
                  <TableCell
                     key={property.id}
                     align={property.align}
                     sortDirection={orderBy === property.id ? order : false}
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
            </TableRow>
         </TableHead>

         {/*//================================================*/}

         <TableBody>
            {_.orderBy(props.rows, [orderBy], [order]).map((row, index) => {
               return (
                  <TableRow key={index}>
                     {props.headRows.map((property, index) => (
                        <TableCell key={index} align={property.align}>
                           {row[property.id]}
                        </TableCell>
                     ))}
                  </TableRow>
               );
            })}
         </TableBody>
      </Table>
   );
};

export default UsersTable;

//================================================
// Receives 2 parameters from parent:
// headRows = Array
// rows = Object / Array
//================================================
// headRows = [
//    { id: 'name', label: 'Name', align: 'left' },
//    { id: 'mail', label: 'Mail', align: 'center' },
//    { id: 'age', label: 'Age', align: 'right' }
// ];
// rows = {
//    id1: { name: 'Name', mail: 'mail@mail.com', age: 10 },
//    id2: { name: 'Other', mail: 'other@other.com', age: 20 },
//    id3: { name: 'One', mail: 'one@one.com', age: 30 }
// };
// OR
// rows = [
//    { name: 'Name', mail: 'mail@mail.com', age: 10 },
//    { name: 'Other', mail: 'other@other.com', age: 20 },
//    { name: 'One', mail: 'one@one.com', age: 30 }
// ];
//================================================
