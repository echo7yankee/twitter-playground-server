export class MongoClient {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  public async find(params): Promise<any> {
    try {
      const items = await this.model.find(params);

      return items;
    } catch (error) {
      console.log(error);
    }
  }

  public async findById(id): Promise<any> {
    try {
      const item = await this.model.findById(id);

      return item;
    } catch (error) {
      console.log(error);
    }
  }

  public async findOne(params): Promise<any> {
    try {
      const item = await this.model.findOne(params);
      return item;
    } catch (error) {
      console.log(error);
    }
  }

  public async create(item): Promise<any> {
    try {
      const newItem = new this.model({ ...item });
      const createdItem = await newItem.save();

      return createdItem;
    } catch (error) {
      console.log(error);
    }
  }

  public async remove(id): Promise<any> {
    try {
      const removedItem = await this.model.findByIdAndRemove(id);
      return removedItem;
    } catch (error) {
      console.log(error);
    }
  }

  public async update(id, updatedAttributes): Promise<any> {
    try {
      let item = await this.model.findById(id);

      Object.keys(updatedAttributes).forEach(key => {
        item[key] = updatedAttributes[key];
      });

      const updatedItem = await item.save();

      return updatedItem;
    } catch (error) {
      console.log(error);
    }
  }
}
