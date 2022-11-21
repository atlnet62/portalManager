import pool from "../database/db.js";

class Model {
    static async getAllDatas(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    static async getDataByKey({ query, key }) {
        const [result] = await pool.execute(query, [key]);
        return result;
    }

    static async getDataByKeys({ query, key1, key2 }) {
        const [result] = await pool.execute(query, [key1, key2]);
        return result;
    }

    static async removeDataByKeys({ query, key1, key2 }) {
        const [result] = await pool.execute(query, [key1, key2]);
        return result;
    }

    static async removeDataByKey({ query, key }) {
        const [result] = await pool.execute(query, [key]);
        return result;
    }

    static async saveData(query, datas) {
        const [result] = await pool.execute(query, [...Object.values(datas)]);
        return result;
    }
}

export default Model;
