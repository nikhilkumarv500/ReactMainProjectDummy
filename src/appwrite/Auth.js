import { Client, Account, ID } from "appwrite";
import conf from "../conf/Conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // console.log(
    //   conf.appwriteUrl +
    //     " " +
    //     conf.appwriteProjectId +
    //     " " +
    //     import.meta.env.VITE_APPWRITE_URL
    // );
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  acc() {
    return this.account;
  }

  async signup(email, password, name) {
    try {
      const promise = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (promise) return promise;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async login(email, password) {
    try {
      const promise = this.account.createEmailSession(email, password);
      if (promise) return promise;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      const promise = await this.account.get();
      // console.log(promise);
      return promise;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();

export default authService;
