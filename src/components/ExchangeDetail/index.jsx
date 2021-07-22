import React from 'react';

import {
  Button
} from 'reactstrap';

import './index.css';

export const ExchangeDetail = props => {

  return (
   <div className="detailBlock">
     <span className="title">Details</span>
     <div className="innerRow">
       <span>Sell</span>
       <span>{props?.sellVal || ''}</span>
     </div>
     <div className="innerRow">
       <span>Buy</span>
       <span>{props?.buyVal || ''}</span>
     </div>
     <div className="buttonsBlock">
       <Button
        outline
        onClick={props.onCancel}
       >
         Cancel
       </Button>
       <Button
        onClick={props.onConfirm}
       >
         Confirm
       </Button>
     </div>
   </div>
  );
};
