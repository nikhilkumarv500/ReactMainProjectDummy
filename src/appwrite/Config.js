import { Client, Databases, Query } from "appwrite";
import conf from "../conf/Conf.js";

class DataService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async addRecord(
    uniqueId,
    dishId,
    dishName,
    userId,
    dishQuantity,
    dishPrice,
    dishUrl
  ) {
    try {
      const promise = this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        uniqueId,
        {
          dishId,
          dishName,
          userId,
          dishQuantity,
          dishPrice,
          dishUrl,
        }
      );
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  async fetchRecordAll(userId) {
    const promise = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [Query.equal("userId", userId)]
    );

    // console.log(promise);

    return promise;
  }

  async deleteRecord(dishUniqueSlugId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        dishUniqueSlugId
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateRecord(
    dishUniqueSlugId,
    dishId,
    name,
    userId,
    quantity,
    price,
    url
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        dishUniqueSlugId,
        {
          dishQuantity: quantity,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getRecord(userId, dishId) {
    const promise = this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [Query.equal("dishId", dishId), Query.equal("userId", userId)]
    );
    return promise;
  }
}

export const dataService = new DataService();

export default DataService;
