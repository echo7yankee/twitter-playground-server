export class DAO {
  client: any;
  constructor(client: any) {
    this.client = client;
  }

  public async find(params: any) {
    return await this.client.find(params);
  }

  public async findById(id: string) {
    return await this.client.findById(id);
  }

  public async findOne(params: any) {
    return await this.client.findOne(params);
  }

  public async add(item: object) {
    return await this.client.create(item);
  }

  public async remove(id: string) {
    return await this.client.remove(id);
  }

  public async removeAll(params) {
    return await this.client.removeAll(params);
  }

  public async update(id, item) {
    return await this.client.update(id, item);
  }
};
