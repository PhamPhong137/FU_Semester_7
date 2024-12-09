"use strict"

import newService from "../services/new.service.js";

export const NewController = {

    getAllNews: async (req, res) => {
        try {
            const news = await newService.getAllNews();
            if (!news || news.length === 0) {
                return res.status(404).json({ message: "No news found" });
            }
            res.status(200).json(news);
        } catch (error) {
            console.error('Error fetching news:', error);
            res.status(500).json({ message: error.message });
        }
    }

}