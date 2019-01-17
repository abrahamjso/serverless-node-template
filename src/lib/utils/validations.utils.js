// External Libs
const yup = require('yup');

// Main
const Request = {
  personById: yup.object().shape({ id: yup.string().required() }),
  person: yup.object().shape(
    {
      name: yup.string().required(),
      description: yup.string().required()
    },
  ),
};

module.exports = {
  Request,
  Validate: (schema, object) => {
    return new Promise((resolve, reject) => {
      schema.validate(object).then(resolve).catch(reject);
    });
  },
};
