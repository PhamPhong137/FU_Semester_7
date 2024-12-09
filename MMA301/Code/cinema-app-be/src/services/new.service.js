import newRepository from "../repositories/new.repository.js";

const newService = {
    getAllNews: async () => {
        try {
            const news = await newRepository.findAllNews();
            return news;
        } catch (error) {
            console.error('Error in newService.getAllNews:', error);
            throw new Error("Error fetching news");
        }
    }
}

export default newService;
