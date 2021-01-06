'use strict'

const Cloudinary = use('Cloudinary')
const Config = use('Config')
const apiSecret = Config.get('cloudinary.api_secret')

class CloudinaryController {
  sign({request}) {
    let data = request.get();
    return Cloudinary.utils.api_sign_request(JSON.parse(data.params_to_sign), apiSecret);
  }
}

module.exports = CloudinaryController
