
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Investment from './Investment';

const Investments = () => {
  const navigate = useNavigate();
  
  return <Investment />;
};

export default Investments;
