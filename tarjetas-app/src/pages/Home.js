import React, { useState, useEffect } from 'react';
export default function Home() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=2')
  .then(response => response.json())
  .then(data => console.log(data.results[0].gender));
      });
    return <h2>Home</h2>;
  }

