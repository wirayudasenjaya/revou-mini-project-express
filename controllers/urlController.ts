import { Request, Response } from "express";
import shortid from "shortid";

let map = new Map<string, string>();

export let urlController = {
  getShortId: async (req: Request, res: Response) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ status: 400, message: "URL is required" });
    }

    try {
      const id = shortid.generate();

      map.set(id, url);

      res.json({
        status: 200,
        message: "ok",
        data: {
          short_id: id,
          url: url,
        },
      });
    } catch (e) {
      res.status(500);
      res.json({ status: 500, message: "error" });
    }
  },

  redirectToUrl: async (req: Request, res: Response) => {
    const { short_id } = req.params;

    if (!short_id) {
      return res
        .status(400)
        .json({ status: 400, message: "Short ID is required" });
    }

    try {
      let url = map.get(short_id);

      if (!url) {
        return res.status(400).json({ status: 400, message: "URL not found" });
      }

      res.status(301).redirect(url!);
    } catch (e) {
      res.status(500);
      res.json({ status: 500, message: "error" });
    }
  },
};
