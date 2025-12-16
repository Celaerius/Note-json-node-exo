const AppDataSource = require('../config/data-source');

class TagService {

    static get repository() {
        return AppDataSource.getRepository('Tag');
    }

    static async getAllTags() {
        return await this.repository.find();
    }

    static async findById(id) {
        return await this.repository.findOneBy({ id });
    }

    static async createTag(tag) {
        const newTag = this.repository.create({
            label: tag.label,
        });

        return await this.repository.save(newTag);
    }
}

module.exports = TagService;