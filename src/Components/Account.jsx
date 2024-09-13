import React from 'react';
import Business from './Business';
import Home from './Home';
import Settings from './Settings';
import Transfer from './Transfer';
import ViewAccounts from './ViewAccounts';
export default function Account({category}) {
  const setCategory = (category) => {
    if (category === 'home') {
      return <Home/>
    }
    else if (category === 'transfer') {
      return <Transfer/>
    }
    else if (category === 'view') {
      return <ViewAccounts/>
    }
    else if (category === 'business') {
      return <Business/>
    }
    else if (category === 'settings') {
      return <Settings/>
    }
  }
  return (
    <div>
      {setCategory(category)}
    </div>
  )
}
