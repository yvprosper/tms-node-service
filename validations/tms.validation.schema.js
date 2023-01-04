const fs = require('fs')
const {arithmeticOperators, logicalOperators} = require('../data/data')
const Joi = require('joi')
const data = fs.readFileSync("data/transactions.json", "utf-8");
const doc = JSON.parse(data);
const Transactions = Array.from(doc);


// validation for creating a transaction
const createTransactionSchema = async  (payload) => {
  const schema = Joi.object({
  workFlow: Joi.string().required(),
  version: Joi.number().required(),
  transaction: Joi.object().keys({
    entryDate: Joi.string().required(),
  amount: Joi.string().required(),
  channel: Joi.string().valid("branch", "online", "atm", "pos", "mobile", "unknown").required(),
  category: Joi.string().valid("deposit", "withdrawal", "transfer", "webPurchase").required(),
  accountNumber: Joi.string().required(),
  localAmount: Joi.string(),
  cardNumber: Joi.string(),
  balance: Joi.string(),
  channelLocation: Joi.string(),
  checkNumber: Joi.string(),
  channelIpAddress: Joi.string(),
  internationalTransaction: Joi.boolean(),
  merchantCategoryCode: Joi.number().required(),
  merchantCountryCode: Joi.string().required(),
  currency: Joi.string().min(2).required(),
  description: Joi.string(),
  status: Joi.string()
    .valid("completed", "accepted", "rejected", "pending", "canceled", "acknowledged", "paused")
    .required(),
  transactionMethod: Joi.string()
    .valid(
    "fee",
    "interest",
    "cash",
    "check",
    "payment",
    "direct_debit",
    "transfer",
    "reversal",
    )
    .required(),
  beneficiary: Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.string().valid("individual", "legal_entity"),
    name: Joi.string().required(),
    accountNumber: Joi.string().min(10).max(10),
    address: Joi.string(),
    bankName: Joi.string(),
    bic: Joi.string().min(11).max(11),
    iban: Joi.string().min(14).max(14),
    merchantCategoryCode: Joi.number(),
    merchantCountryCode: Joi.string(),
  })
  })
  }).unknown();
  return schema.validate(payload);
};

// validation for creating a rule
const createRuleSchema = async  (payload) => {
  const schema = Joi.object({
  workFlow: Joi.string().required(),
  version: Joi.number().required(),
  rules: Joi.array().items({
    header: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    priority: Joi.number().required(),
    groupOperator: Joi.string().allow(null).valid(...logicalOperators).required(),
    score: Joi.number().required(),
    tag: Joi.string().required(),
    groups: Joi.array().items({
      operator: Joi.string().valid(...logicalOperators) ,
      sentences: Joi.array().items({
        type: Joi.string().valid("static", "dynamic"),
        inputField: Joi.string().custom((value, helper)=>{
          if (!Transactions[0][`${value}`]) throw new Error("input field does not match dataset");
          return value;
        }),
        operation: Joi.string().valid(...arithmeticOperators),
        action: Joi.string().allow(null),
        actionField: Joi.string().allow(null),
        filterFields: Joi.array().allow(null),
        dateRange: Joi.array().allow(null),
        compareTo: Joi.string().allow(null),
        includeCurrent: Joi.boolean().allow(null)

      })
    })
  })
  }).unknown();
  return schema.validate(payload);
};



module.exports = {
createTransactionSchema,
createRuleSchema,
}