import landingService from "../services/landing.service.js";

class LandingController {
  async saveLandingInfo(request, response) {
    const { landingName } = request.params;
    const { description, workers } = request.body;

    const status = await landingService.save(landingName, description, workers);
    if (!status) {
      return response.status(400).json('An error occurred while saving the page');
    }

    return response.status(200).json('Page saved successfully');
  }

  async getLandingInfo(request, response) {
    const { landingName } = request.params;

    const landingInfo = await landingService.get(landingName);
    if (!landingInfo) {
      return response.status(404).json('Page not found');
    }

    return response.status(200).json(landingInfo);
  }

  async getLandingsLinks(request, response) {
    const links = await landingService.getLinks();

    if (!links) {
      return response.status(500).json('Failed to send existing links');
    }

    return response.status(200).json(links);
  }
}

export default new LandingController();
