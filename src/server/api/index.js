import * as URL from 'server/constants/URL';
import middlewarify from 'server/utils/middlewarify';
import { get as getGIFs } from 'server/api/middleware/Giphy';
import { get as getPosts, find as findPost } from 'server/api/middleware/Post';

export default router => {
  router.get(URL.IMAGES, middlewarify(getGIFs));

  // Experiments
  router.get(URL.POSTS, async (req, res, next) => {
    try {
      const { data } = await getPosts();

      res.json(data);
    } catch (err) {
      //this will eventually be handled by your error handling middleware
      next(err);
    }
  });

  router.get(URL.POST, middlewarify(findPost));
  
  return router;
}