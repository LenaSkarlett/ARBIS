import postgres from "../config/db/postgres.js";

class LandingService {
  async save(name, description, workers) {
    if (await this.get(name)) {
      return (await postgres.query(
        `UPDATE landings SET description = $1, workers = $2 WHERE name = $3;`, 
        [description, JSON.stringify(workers), name]
      )).rowCount > 0;
    }
    else {
      return (await postgres.query(
        `INSERT INTO landings (name, description, workers) VALUES ($1, $2, $3);`, 
        [name, description, JSON.stringify(workers)]
      )).rowCount > 0;
    }
  }

  async get(name) {
    try {
      const landingInfo = (await postgres.query(
        `SELECT * FROM landings WHERE name = $1`, 
        [name]
      )).rows[0];

      if (!landingInfo) {
        return false;
      }
  
      landingInfo.workers = JSON.parse(landingInfo.workers);

      landingInfo.workers = landingInfo.workers.map((worker) => {
        worker.specialty = worker.specialty.slice(2).split('\n● ');
        worker.experience = worker.experience.split('\n');
        worker.certificates = worker.certificates.split('\n');
        return worker;
      })
  
      return landingInfo;
    } catch (error) {
      console.log(`[landing] the called page does not exist`);
      console.log(error);
      return null;
    }
  }
}

export default new LandingService();
