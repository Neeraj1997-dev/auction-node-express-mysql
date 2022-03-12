const Helper = require('../config/helper');
const users_function = require('../function/userFunction');
const jsonData = require('../config/jsonData');

module.exports = {
  // Create User
  createUser: async (req, res) => {
    try {
      const required = {
        security_key: req.headers.security_key,
        phone: req.body.phone,
      };
      const non_required = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      };
      let requestdata = await Helper.vaildObject(required, non_required, res);
      let password_details = await my_function.convert_password_to_sha1(requestdata);
      file_data = '';
      if (req.files && req.files.image) {
        image = req.files.image
        file_data = await users_function.file_upload(image)
      }
      let createuser = await users_function.createUser(requestdata,password_details, file_data);
      if (createuser) {
        let msg = 'Sign Up Successfully';
        jsonData.true_status(res, msg)
      }

    }
    catch (error) {
      throw error
    }

  }




}