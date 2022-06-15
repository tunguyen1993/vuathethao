import { HttpException } from "@nestjs/common";

export class baseService {
  public model: any;

  constructor(model?) {
    this.model = model;
  }

  public async paginationScroll(
    model,
    pageSize,
    pageLimit,
    search = {},
    order = [],
    transform,
  ) {
    try {
      const limit = parseInt(pageLimit, 10) || 10;
      const page = parseInt(pageSize, 10) || 1;

      // create an options object
      let options = {
        offset: this.getOffset(page, limit),
        limit: limit,
      };

      // check if the search object is empty
      if (Object.keys(search).length) {
        options = { ...options, ...search };
      }

      // check if the order array is empty
      if (order && order.length) {
        options["order"] = order;
      }
      // take in the model, take in the options
      let { count, rows } = await model.findAndCountAll(options);

      // check if the transform is a function and is not null
      if (transform && typeof transform === "function") {
        rows = transform(rows);
      }

      return {
        previous_page: this.getPreviousPage(page),
        current_page: page,
        next_page: this.getNextPage(page, limit, count),
        total_page: Math.ceil(count / limit),
        totalRecord: count,
        limit: limit,
        data: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  private getOffset = (page, limit) => {
    return page * limit - limit;
  };
  private getNextPage = (page, limit, total) => {
    if (total / limit > page) {
      return page + 1;
    }

    return null;
  };
  private getPreviousPage = (page) => {
    if (page <= 1) {
      return null;
    }
    return page - 1;
  };
}
