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

      const timeToDelete = this.isPossibleDelete(landingInfo.createdat);
      if (timeToDelete) {
        this.deleteLanding(landingInfo.name);
        return null;
      }
  
      landingInfo.workers = JSON.parse(landingInfo.workers);

      landingInfo.workers = landingInfo.workers.map((worker) => {
        worker.specialty = worker.specialty.slice(2).split('\n● ');
        worker.experience = worker.experience.split('\n');
        worker.certificates = worker.certificates.split('\n');
        return worker;
      });
      
      return landingInfo;
    } catch (error) {
      console.log(`[landing] the called page does not exist`);
      console.log(error);
      return null;
    }
  }

  async getLinks() {
    try {
      const links = (await postgres.query(
        `SELECT name, createdat FROM landings`
      )).rows;
      return links;
    } catch (error) {
      console.log(`[landing] failed to send existing links`);
      console.log(error);
      return null;
    }
  }

  async deleteLanding(name) {
    try {
      const links = (await postgres.query(
        `DELETE FROM landings WHERE name = $1`,
        [name]
      )).rows;
      return true;
    } catch (error) {
      console.log(`[landing] landing page deletion error`);
      console.log(error);
      return false;
    }
  }

  isPossibleDelete(date) {
    const halfYearInMs = 15768000000;
    const dateNow = new Date();
    const differenceMs = dateNow.getTime() - new Date(date).getTime();
    return differenceMs > halfYearInMs;
  }
}

export default new LandingService();
