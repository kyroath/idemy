const validate = async (schema, value, res) => {
  try {
    return await schema.validateAsync(value);
  } catch (error) {
    res.status(400).send(error.details);
    return null;
  }
};

module.exports = {
  validate,
};
