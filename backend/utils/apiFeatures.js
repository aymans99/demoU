class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
            { keywords: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };

    //Removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advancve filter for price,ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1); //on whcih page we wana go and how many producs to be displayed

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
module.exports = APIFeatures;
