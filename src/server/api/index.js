import * as URL from 'server/constants/URL';
import { getPhotos, getUsers } from 'server/api/middleware/Resources';
import { get as getImages } from 'server/api/middleware/Images';
import middlewarify from 'server/utils/middlewarify';

export default router => {
  router.get(URL.IMAGES, middlewarify(getImages));

  // Experiments
  router.get(URL.PHOTOS, middlewarify(getPhotos));
  router.get(URL.USERS, async (req, res, next) => {
    try {
      const { data } = await getUsers();

      res.json(data);
    } catch (err) {
      //this will eventually be handled by your error handling middleware
      next(err);
    }
  });

  return router;
}
