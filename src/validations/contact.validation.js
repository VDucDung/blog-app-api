const Joi = require('joi');
const { objectId, username, phone, email } = require('./custom.validation');

const createContact = {
  body: Joi.object().keys({
    username: Joi.string().custom(username).required(),
    email: Joi.string().custom(email).required(),
    phone: Joi.string().custom(phone).allow(null, ''),
    message: Joi.string().required(),
  }),
};

const getContacts = {
  query: Joi.object().keys({
    keyword: Joi.string().allow(null, ''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    lang: Joi.string().optional(),
    username: Joi.string().allow(null, ''),
    email: Joi.string().allow(null, ''),
    phone: Joi.string().allow(null, ''),
    message: Joi.string().allow(null, ''),
  }),
};

const getContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId),
  }),
};

const updateContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string().custom(username).required(),
      email: Joi.string().custom(email).required(),
      phone: Joi.string().custom(phone).allow(null, ''),
      message: Joi.string().required(),
    })
    .min(1),
};

const deleteContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
