import * as URL from 'server/constants/URL';
import middlewarify from 'server/utils/middlewarify';
import { get as getGIFs } from 'server/api/middleware/Giphy';

export default router => {
  router.get(URL.IMAGES, middlewarify(getGIFs));
  
  return router;
}
