const db = require('../models');
var path = require('path');
const jsonData = require('../config/jsonData');
var crypto = require('crypto');
const users = db.users;
var { v4: uuidv4 } = require('uuid');
console.log(uuidv4())

module.exports = {
  //Convert Password to Sha1
  convert_password_to_sha1: async function (reqdata) {

    const converted_password = crypto.createHash('sha1').update(reqdata.password).digest('hex');

    return converted_password;
  },
  //Upload document
  file_upload: async function (get_image_data) {

    let image = get_image_data
    //  console.log(image,"image")
    if (Array.isArray(image) === true) {
      temp_array = [];
      await Promise.all(image.map(async c => {
        var extension = path.extname(c.name);
        var fileimage = uuidv4() + extension;
        c.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {
          if (err)
            console.log(err);
        });
        temp_array.push(fileimage)
      }));
      return temp_array
    } else {
      var extension = path.extname(image.name);
      var fileimage = uuidv4() + extension;
      image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {
        if (err)
          console.log(err);
      });
      return fileimage;

    }
  },

  // User Create

  createUser: async function (requestdata, file_dataa, password_details, req, res) {
    try {
      var get_email = await users.findOne({
        attributes: ['id', 'email'],
        where: {
          email: requestdata.email,
        }

      });

      if (get_email) {
        let msg = 'Email Already Exist ';
        jsonData.wrong_status(res, msg)
        return false;
      }
      if (requestdata.phone !== '') {
        get_phone = await users.findOne({
          attributes: ['id', 'phone'],
          where: {
            phone: requestdata.phone,
          }
        })
        if (get_phone) {
          let msg = 'Phone number already exist ';
          jsonData.wrong_status(res, msg)
          return false;
        }
        create_signup_user = await users.create({
          firstname: requestdata.firstname,
          lastname: requestdata.lastname,
          email: requestdata.email,
          image: file_data,
          password: password_details,
          phone: requestdata.phone,

        });
        return create_signup_user
      }
    }
    catch (error) {
      throw error
    }

  },

  // Generate Auth Key
  generate_auth_key: async function (get_auth_key) {

    let auth_create = crypto.randomBytes(30).toString('hex');

    return auth_create;
  },



  // user Login

  user_Login: async function (data, convert_data, get_auth_key, req, res) {
    let getdata = await users.findOne({
      where: {
        [Op.or]: [
          { email: data.email },
          { phone: data.email },
        ],
        password: convert_data,
      }
    });
    if (getdata) {
      let check_email_password = '';
      if (getdata !== null) {
        const update_details = await users.update({
          authKey: get_auth_key,
          deviceType: data.device_type,
          deviceToken: data.device_token,
        },
          {
            where: {
              [Op.or]: [
                { email: data.email },
                { phone: data.email },
              ],
              password: convert_data,
            }
          }
        );
        check_email_password = await users.findOne({
          where: {
            [Op.or]: [
              { email: data.email },
              { phone: data.email },
            ],
            password: convert_data,
            usertype: 1
          }

        });
        return check_email_password

      } else {
        return check_email_password
      }
    }
    else {
      let check_email_password = '';
      return check_email_password

    }

  },



}