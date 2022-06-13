import workersService from './../services/workers.service.js';

class WorkersController {
  async add(request, response) {
    const { fullname, specialty, experience, certificates } = request.body;
    const photo = request.file;

    if (!photo || !fullname || !specialty || !experience || !certificates) {
      return response
        .status(400)
        .json('Error.');
    }

    if (await workersService.exists(photo, fullname)) {
      return response
        .status(400)
        .json('Such an worker already exists.');
    }

    const port = process.env.SERVER_PORT || 4000;
    const photoPath = `${request.protocol}://${request.host}:${port}/${photo.path.slice(7, photo.path.length)}`;

    return response.status(200).json(await workersService.create(photoPath, fullname, specialty, experience, certificates));
  }

  async getAll(request, response) {
    response.status(200).json(await workersService.getAll());
  }

  async edit(request, response) {
    const { id } = request.params;
    const { fullname, specialty, experience, certificates, photoPath } = request.body;
    const photo = request.file;

    if (!photo && !photoPath) {
      response.status(400).json('Photo not geeting');
    }

    let newPhotoPath = '';
    if (!photoPath) {
      const port = process.env.SERVER_PORT || 4000;
      newPhotoPath = `${request.protocol}://${request.host}:${port}/${photo.path.slice(7, photo.path.length)}`;
    }

    response.status(200).json(await workersService.edit(id, newPhotoPath ? newPhotoPath : photoPath, fullname, specialty, experience, certificates));
  }

  async delete(request, response) {
    const { id } = request.params;
    response.status(200).json(await workersService.delete(id));
  }
}

export default new WorkersController();
