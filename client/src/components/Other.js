import React, { useState } from 'react';

const Other = () => {
   const [books, setBooks] = useState([
      { name: 'Book1', description: 'book1 description', active: 1 },
      { name: 'Book2', description: 'book2 descri', active: 0 },
      { name: 'Book3', description: 'book3 de', active: 0 }
   ]);

   const click = (index) => {
      const updated = [...books];
      updated[index].active = !updated[index].active;
      setBooks(updated);
   };

   return (
      <div>
         <ul>
            {books.map((book, index) => (
               <li key={index}>
                  <p onClick={() => click(index)}>{book.name}</p>
                  {book.active ? <p>{book.description}</p> : ''}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Other;
