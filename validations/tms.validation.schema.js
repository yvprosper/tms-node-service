const fs = require('fs')
const {arithmeticOperators, logicalOperators} = require('../data/data')
const Joi = require('joi')
const data = fs.readFileSync("data/transactions.json", "utf-8");
const doc = JSON.parse(data);
const Transactions = Array.from(doc);



// validation for creating a transaction
const createTransactionSchema = async  (payload) => {
  const schema = Joi.object({
  transactionDate: Joi.string().required(),
  transactionAmount: Joi.string().required(),
  channel: Joi.string().valid("branch", "online", "atm", "pos", "mobile", "unknown").required(),
  category: Joi.string().valid("deposit", "withdrawal", "transfer", "webPurchase").required(),
  accountNumber: Joi.string().required(),
  localTransactionAmount: Joi.string(),
  cardNumber: Joi.string(),
  accountBalance: Joi.string(),
  channelLocation: Joi.string(),
  checkNumber: Joi.string(),
  channelIpAddress: Joi.string(),
  internationalTransfer: Joi.boolean(),
  merchantCategoryCode: Joi.string().min(4).max(4).required(),
  merchantCountryCode: Joi.string().required(),
  currency: Joi.string().min(2).required(),
  description: Joi.string(),
  transactionStatus: Joi.string()
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
  transactionBeneficiary: Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.string().valid("individual", "legal entity"),
    name: Joi.string().required(),
    accountNumber: Joi.string().min(10).max(10),
    address: Joi.string(),
    bankName: Joi.string(),
    bic: Joi.string().min(11).max(11),
    iban: Joi.string().min(14).max(14),
    merchantCategoryCode: Joi.string().min(4).max(4),
    merchantCountryCode: Joi.string(),
  })
  }).unknown();
  return schema.validate(payload);
};

// validation for creating a rule
const createRuleSchema = async  (payload) => {
  const schema = Joi.object({
  header: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string().required(),
  priority: Joi.number().required(),
  groupOperator: Joi.string().valid(...logicalOperators).required(),
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
        action: Joi.string(),
        actionField: Joi.string(),
        filterFields: Joi.array(),
        dateRange: Joi.array(),
        compareTo: Joi.string(),
        includeCurrent: Joi.boolean()

      })
    })
  }).unknown();
  return schema.validate(payload);
};



module.exports = {
createTransactionSchema,
createRuleSchema,
}