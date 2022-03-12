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
      let password_details = await users_function.convert_password_to_sha1(requestdata);
      file_data = '';
      if (req.files && req.files.image) {
        image = req.files.image
        file_data = await users_function.file_upload(image)
      }
      let createuser = await users_function.createUser(requestdata, password_details, file_data);
      if (createuser) {
        let msg = 'Sign Up Successfully';
        jsonData.true_status(res, msg)
      }

    }
    catch (error) {
      throw error
    }

  },

  ///// User Login
  userLogin: async function (req, res) {
    try {
      const required = {

        security_key: req.headers.security_key,
        email: req.body.email,
        password: req.body.password,

      };
      const non_required = {};

      let requestdata = await Helper.vaildObject(required, non_required, res);
      let get_auth_key = await users_function.generate_auth_key(req, res);

      convert_password = await users_function.convert_password_to_sha1_user(requestdata)

      let getdata = await users_function.user_Login(requestdata, convert_password, get_auth_key, req, res);

      if (getdata) {
        let msg = 'Log In Successfully';
        jsonData.true_status(res, getdata, msg)
      } else {
        let msg = 'Incorrect Email Or Password';
        jsonData.wrong_status(res, msg)
      }

    }
    catch (error) {
      throw error
    }
  },




}