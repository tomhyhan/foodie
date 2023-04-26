import { createRouter } from "next-connect";
import restricted from "../restricted";
import logger from '@/logger/logger';
import { deletePostById } from "../../../lib/data/post.data";
import { deletePost } from "../../../lib/controllers/post.controller";

const router = createRouter()

router.delete(restricted, async (req, res) => {
    const id = req.query.id

    logger.info(`delete request for ${id}`)
    
    // here
    try {
        await deletePost(id)
        res.status(204).end()
    } catch(err) {
        res.status(500).json({error: err});
    }
})

export default router.handler({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found!");
    },
  })
  