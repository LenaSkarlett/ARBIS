import postgres from './../config/db/postgres.js';

class WorkersService {
  async create(photoPath, fullname, specialty, experience, certificates) {
    try {
      return (await postgres.query(
        `INSERT INTO workers (photo, fullname, specialty, experience, certificates) VALUES ($1, $2, $3, $4, $5);`, 
        [photoPath, fullname, specialty, experience, certificates]
      )).rowCount > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async exists(photo, fullname) {
    try {
      return (await postgres.query(
        `SELECT id FROM workers WHERE photo = $1 AND fullname = $2;`, 
        [photo, fullname])
      ).rowCount > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAll() {
    return (await postgres.query(`SELECT * FROM workers;`)).rows;
  }

  async edit(id, photoPath, fullname, specialty, experience, certificates) {
    try {
      return (await postgres.query(
        `UPDATE workers SET photo = $1, fullname = $2, specialty = $3, experience = $4, certificates = $5 WHERE id = $6;`, 
        [photoPath, fullname, specialty, experience, certificates, id])
      ).rowCount > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async delete(id) {
    try {
      return (await postgres.query(`DELETE FROM workers WHERE id = $1;`, [id])).rowCount > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new WorkersService();
