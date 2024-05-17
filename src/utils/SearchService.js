class SearchService {
  constructor(model) {
    this.model = model;
  }

  async getResults(queryParams, searchFields) {
    const { searchKeyword, page = 1, limit = 10 } = queryParams;
    let where = {};

    if (searchKeyword) {
      where.$or = searchFields.map((field) => ({
        [field]: { $regex: searchKeyword, $options: 'i' },
      }));
    }

    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;
    const total = await this.model.countDocuments(where);
    const pages = Math.ceil(total / pageSize);
    const currentPage = parseInt(page);

    const results = await this.model
      .find(where)
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: 'userId',
          select: ['avatar', 'username', 'isVerify'],
        },
        {
          path: 'categories',
          select: ['name'],
        },
      ])
      .sort({ updatedAt: 'desc' });

    return {
      results,
      total,
      pages,
      pageSize,
      currentPage,
    };
  }
}

module.exports = SearchService;
