import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"

const multerUpload = multer()
export const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    multerUpload.single("file")(req, res, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  })
