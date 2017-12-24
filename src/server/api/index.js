import * as URL from 'server/constants/URL';
import middlewarify from 'server/utils/middlewarify';
import { get as getGIFs } from 'server/api/middleware/Giphy';
import { get as getBlogs, find as findBlog } from 'server/api/middleware/Blog';

export default router => {
  router.get(URL.IMAGES, middlewarify(getGIFs));

  // Experiments
  router.get(URL.BLOGS, async (req, res, next) => {
    try {
      const { data } = await getBlogs();

      res.json(data);
    } catch (err) {
      //this will eventually be handled by your error handling middleware
      next(err);
    }
  });

  router.get(URL.BLOG, middlewarify(findBlog));
  
  return router;
}
