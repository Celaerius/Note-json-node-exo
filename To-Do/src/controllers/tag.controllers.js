const TagService = require('../services/tag.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class TagController {

    static getAllTags = asyncHandlers(async (req, res) => {
        const tags = await TagService.getAllTags();
        res.status(200).json(tags);
    });

    static createTag = asyncHandlers(async (req, res) => {
        const newTag = await TagService.createTag(req.body);
        res.status(201).json(newTag);
    });
}

module.exports = TagController;
