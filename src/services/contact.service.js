const { Contact } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { contactMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, contactMessage().NOT_FOUND);
  }
  return contact;
};

const createContact = async (contactBody) => {
  const contact = await Contact.create(contactBody);
  return contact;
};

const getContactsByKeyword = async (requestQuery) => {
  const searchFeatures = new SearchFeature(Contact);
  const { results, ...detailResult } = await searchFeatures.getResults(requestQuery, ['username', 'email', 'phone']);
  return { contacts: results, ...detailResult };
};

const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  await contact.deleteOne();
  return contact;
};

module.exports = {
  getContactById,
  createContact,
  getContactsByKeyword,
  updateContactById,
  deleteContactById,
};
