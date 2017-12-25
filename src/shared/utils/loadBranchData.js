import { matchRoutes } from 'react-router-config';
import routes from 'app/routes';

export default (store, location) => {
  const branch = matchRoutes(routes, location);

  const promises = branch.map(({ route, match }) => {
    const { component: { fetchData } } = route;

    return fetchData ? store.dispatch(fetchData(match)) : Promise.resolve(null);
  });

  return Promise.all(promises);
};