import { fetchRequest, getQuery } from './fetchHelpers';

export const getCurrencies = () => fetchRequest(
 'https://involve.software/test_front/api/payMethods',
 {
   method: 'GET'
 }
)

export const getExchangeVal = ({ ...query }) => fetchRequest(
 `https://involve.software/test_front/api/payMethods/calculate?${getQuery(query)}`,
 {
   method: 'GET'
 }
)

export const saveExchange = ({ data }) => fetchRequest(
   `https://involve.software/test_front/api/bids`,
   {
     body: JSON.stringify(data),
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     }
   }
  )





