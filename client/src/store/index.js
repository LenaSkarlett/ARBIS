import { action, makeObservable, observable } from 'mobx';

class WorkersStore {
  displayMode = 'columns';
  workers = [];
  selectedWorkers = [];
  link = '';
  description = '';
  landingExists = false;

  constructor() {
    makeObservable(this, {
      displayMode: observable,
      workers: observable,
      selectedWorkers: observable,
      link: observable,
      description: observable,
      landingExists: observable,
      switchMode: action,
      setWorkers: action,
      delWorker: action,
      add: action.bound,
      del: action,
      setLink: action,
      setDescription: action
    });
  }

  switchMode(mode) {
    this.displayMode = mode;
  }

  setWorkers(workers) {
    this.workers = workers;
  }

  delWorker(id) {
    this.workers = this.workers.filter(worker => worker.id !== id);
  }
  
  add(worker) {
    if (this.selectedWorkers.length < 5) {
      this.selectedWorkers = [...this.selectedWorkers, worker];
      return true;
    }
    else {
      return false;
    }
  }

  del(id) {
    this.selectedWorkers = this.selectedWorkers.filter(worker => worker.id !== id);
  }

  setLink(link) {
    this.link = link;
  }

  setDescription(description) {
    this.description = description;
  }

  setLandingExists(value) {
    this.landingExists = value;
  }
}

export default new WorkersStore();
