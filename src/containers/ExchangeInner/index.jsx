import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import {
  saveExchange,
  getCurrencies,
  getExchangeVal
} from '../../actions/main';

import {
  Spinner,
  ExchangeDetail,
  ExchangeSuccess
} from '../../components/index';

import {
  Input,
  Button
} from 'reactstrap';

import './index.css';

export const ExchangeInner = () => {
  const [buy, setBuyVal] = useState('');
  const [sell, setSellVal] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [buyOptions, setBuyOptions] = useState([]);
  const [buyCurrency, setBuyCurrency] = useState('');
  const [sellOptions, setSellOptions] = useState([]);
  const [sellCurrency, setSellCurrency] = useState('');
  const [detailExchange, showDetailExchange] = useState('main');
  const [sellOrBuy, setSellOrBuy] = useState('');

  useEffect(() => {
    getCurrencies().then((res) => {
      setSellOptions(res.invoice);
      setBuyOptions(res.withdraw);
    });
  }, []);


  const handleExchangeVal = () => {
    showDetailExchange('detail');
  };

  const renderOption = (item, index) => {
    return (
     <option
      key={`option-${item.name}-${index}`}
      value={item.id}
     >
       {item.name}
     </option>
    );
  };

  const handleChangeVal = ({ target: { id, value } }) => {
    id === 'sellValue' ? setSellVal(value) : setBuyVal(value);
    id === 'sellValue' ? setSellOrBuy('sell') : setSellOrBuy('buy');

    setSpinner(true);

    if (sellCurrency && buyCurrency) {
      getExchangeVal({
        base: id === 'sellValue' ? 'invoice' : 'withdraw',
        amount: value,
        invoicePayMethod: sellCurrency,
        withdrawPayMethod: buyCurrency
      }).then((res) => {
        id === 'sellValue' ? setBuyVal(res?.amount) : setSellVal(res?.amount);
        setSpinner(false);
      });
    }
  };

  const handleSaveChanges = () => {
    // I don`t really get why I should send 'amount' only of those value which user fill in, in case if we already have all values and can store them in BE
    const data = {
      base: sellOrBuy === 'sell' ? 'invoice' : 'withdraw',
      amount: sellOrBuy === 'sell' ? sell : buy,
      invoicePayMethod: +sellCurrency,
      withdrawPayMethod: +buyCurrency
    };
    saveExchange({
      data
    }).then(res => {
      res && showDetailExchange('success');
    });
  };
  if (detailExchange === 'main') {
    return (
     <div className="innerBlock">
       <div className="d-flex justify-content-between">
         <div className="leftBlock">
           <span className="title">Sell</span>
           <div className="customDD">
             <select
              required
              id="sellCurrency"
              name="Select currency"
              onChange={(e) => setSellCurrency(e.target.value)}
             >
               <option value="" disabled selected hidden>Select currency...</option>
               {
                 sellOptions.map(renderOption)
               }
             </select>
           </div>
           <div className="customInputStyle position-relative">
             <Input
              id="sellValue"
              type="number"
              value={sell || ''}
              onChange={handleChangeVal}
              disabled={!sellCurrency || !buyCurrency}
              className="mt-2"
              placeholder="Set value"
             />
             {
               spinner && (
                <div className="inputSpinner">
                  <Spinner play width={35} height={35} />
                </div>
               )
             }
           </div>
         </div>
         <div className="rightBlock">
           <span className="title">Buy</span>
           <div className="customDD">
             <select
              id="buyCurrency"
              value={buyCurrency || ''}
              onChange={(e) => setBuyCurrency(e.target.value)}
             >
               <option value="" disabled selected hidden>Select currency...</option>
               {
                 buyOptions.map(renderOption)
               }
             </select>
           </div>
           <div className="customInputStyle position-relative">
             <Input
              id="buyValue"
              type="number"
              value={buy || ''}
              disabled={!sellCurrency || !buyCurrency}
              onChange={handleChangeVal}
              className="mt-2"
              placeholder="Set value"
             />
             {
               spinner && (
                <div className="inputSpinner">
                  <Spinner play width={35} height={35} />
                </div>
               )
             }
           </div>
         </div>
       </div>
       <div className="buttonBlock">
         <Button
          onClick={handleExchangeVal}
          className={cx({
            'spinner': spinner
          })}
          disabled={!sell || !buy || !sellCurrency || !buyCurrency}
         >
           {
             spinner ? <Spinner play width={35} height={35} /> : 'Exchange'
           }
         </Button>
       </div>
     </div>
    );
  } else if (detailExchange === 'detail') {
    return (
     <ExchangeDetail
      buyVal={`${buy} ${buyOptions.find(el => el.id === +buyCurrency).name}`}
      sellVal={`${sell} ${sellOptions.find(el => el.id === +sellCurrency).name}`}
      onCancel={() => showDetailExchange('main')}
      onConfirm={handleSaveChanges}
     />
    );
  } else if (detailExchange === 'success') {
    return (
     <ExchangeSuccess
      onHome={() => showDetailExchange('main')}
     />
    );
  }
};
