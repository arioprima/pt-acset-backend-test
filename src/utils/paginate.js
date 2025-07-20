const paginate = async (model, query, populate = null, sort = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query)
            .populate(populate)
            .sort(sort)
            .skip(skip)
            .limit(limit),
        model.countDocuments(query)
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

module.exports = paginate;
