import React from 'react';

import {
  Button
} from 'reactstrap';

import successSvg from '../../assets/svg/calcSuccessStep.svg';
import './index.css';

export const ExchangeSuccess = props => {

  return (
   <div className="detailSuccess">
     <div>
       <img src={successSvg} alt="success svg" />
     </div>
     <span className="detailSuccessTitle">
       Success!
     </span>
     <span className="detailSuccessDescription">
       Your exchange order has been placed successfully and will be processed soon.
     </span>
     <div className="buttonsBlock">
       <Button
        onClick={props.onHome}
       >
         Home
       </Button>
     </div>
   </div>
  );
};
