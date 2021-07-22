import _map from 'lodash/map';
import _compact from 'lodash/compact';

export async function fetchRequest(url = '', options = {}) {
  const response = await fetch(url, {
    ...options
  });
  return await response.json();
}

export const getQuery = data => {
  const query = _compact(_map(data, (item, index) => item !== '' && typeof item !== 'undefined' && index && `${index}=${item}`));

  return query.length ? query.join('&') : '';
};
