import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-yellow-500 font-bold h-16 px-6 min-w-[500px]'>
      <div className='text-3xl text-green-900'>&lt;PassOP/&gt;</div>
      <ul className='flex gap-x-4'>
        <li>
          <p className='italic text-2xl text-black'>All Passwords Are Safe Here</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
