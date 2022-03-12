
module.exports = {
    isJson(item) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;

        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }

        if (typeof item === "object" && item !== null) {
            return true;
        }

        return false;
    },
    vaildObject: async function (required, non_required, res) {
        let message = '';
        let empty = [];
        let table_name = (required.hasOwnProperty('table_name')) ? required.table_name : 'users';

        for (let key in required) {
            if (required.hasOwnProperty(key)) {
                if (required[key] == undefined || required[key] == '') {
                    empty.push(key);
                }
            }
        }

        if (empty.length != 0) {
            message = empty.toString();
            if (empty.length > 1) {
                message += " fields are required"
            } else {
                message += " field is required"
            }
            return res.status(400).json({
                'success': false,
                'msg': message,
                'code': 400,
                'body': {}
            });
        } else {
            if (required.hasOwnProperty('security_key')) {
                if (required.security_key != "Neeraj@123") {
                    message = "Invalid security key";
                    res.status(403).json({
                        'success': false,
                        'msg': message,
                        'code': 403,
                        'body': []
                    });
                    res.end();
                    return false;
                }
            }
            if (required.hasOwnProperty('password')) {

            }


            const marge_object = Object.assign(required, non_required);
            delete marge_object.checkexit;

            for (let data in marge_object) {
                if (marge_object[data] == undefined) {
                    delete marge_object[data];
                } else {
                    if (typeof marge_object[data] == 'string') {
                        marge_object[data] = marge_object[data].trim();
                    }
                }
            }

            return marge_object;
        }
    },

    success: function (res, message = '', body = {}) {
        return res.status(200).json({
            'status': true,
            'code': 200,
            'message': message,
            'body': body
        });
    },
    error: function (res, err) {
        console.log(err);
        console.log('error');
        let code = (typeof err === 'object') ? ((err.statusCode) ? err.statusCode : ((err.code) ? err.code : 403)) : 403;
        let message = (typeof err === 'object') ? (err.message) : err;
        res.status(code).json({
            'success': false,
            'error_message': message,
            'code': code,
            'body': []
        });
    }







}