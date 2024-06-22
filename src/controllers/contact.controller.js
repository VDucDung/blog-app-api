const httpStatus = require('http-status');

const response = require('../utils/response');
const { contactService } = require('../services');
const { contactMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');

const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, contactMessage().CREATE_SUCCESS, contact));
});

const getContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.getContactsByKeyword(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, contactMessage().FIND_LIST_SUCCESS, contacts));
});

const getContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId || req.body.contact.id);
  res.status(httpStatus.OK).json(response(httpStatus.OK, contactMessage().FIND_SUCCESS, contact));
});

const updateContact = catchAsync(async (req, res) => {
  const contact = await contactService.updateContactById(req.params.contactId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, contactMessage().UPDATE_SUCCESS, contact));
});

const deleteContact = catchAsync(async (req, res) => {
  const contact = await contactService.deleteContactById(req.params.contactId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, contactMessage().DELETE_SUCCESS, contact));
});

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
