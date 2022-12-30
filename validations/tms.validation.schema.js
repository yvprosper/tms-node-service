const fs = require('fs')
const {arithmeticOperators, logicalOperators} = require('../data/data')
const Joi = require('joi')
const data = fs.readFileSync("data/transactions.json", "utf-8");
const doc = JSON.parse(data);
const Transactions = Array.from(doc);



// validation for creating a transaction
const createTransactionSchema = async  (payload) => {
  const schema = Joi.object({
  TransactionDate: Joi.string().required(),
  TransactionAmount: Joi.string().required(),
  Channel: Joi.string().valid("branch", "online", "atm", "pos", "mobile", "unknown").required(),
  Category: Joi.string().valid("deposit", "withdrawal", "transfer", "webPurchase").required(),
  AccountNumber: Joi.string().required(),
  LocalTransactionAmount: Joi.string(),
  CardNumber: Joi.string(),
  AccountBalance: Joi.string(),
  ChannelLocation: Joi.string(),
  CheckNumber: Joi.string(),
  ChannelIpAddress: Joi.string(),
  InternationalTransfer: Joi.boolean(),
  MerchantCategoryCode: Joi.string().min(4).max(4).required(),
  MerchantCountryCode: Joi.string().required(),
  Currency: Joi.string().min(2).required(),
  Description: Joi.string(),
  TransactionStatus: Joi.string()
    .valid("completed", "accepted", "rejected", "pending", "canceled", "acknowledged", "paused")
    .required(),
  TransactionMethod: Joi.string()
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
  TransactionBeneficiary: Joi.object().keys({
    Id: Joi.string().required(),
    Type: Joi.string().valid("individual", "legal entity"),
    Name: Joi.string().required(),
    AccountNumber: Joi.string().min(10).max(10),
    Address: Joi.string(),
    BankName: Joi.string(),
    Bic: Joi.string().min(11).max(11),
    Iban: Joi.string().min(14).max(14),
    MerchantCategoryCode: Joi.string().min(4).max(4),
    MerchantCountryCode: Joi.string(),
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
        action: Joi.string().allow(null),
        actionField: Joi.string().allow(null),
        filterFields: Joi.array().allow(null),
        dateRange: Joi.array().allow(null),
        compareTo: Joi.string().allow(null),
        includeCurrent: Joi.boolean().allow(null)

      })
    })
  }).unknown();
  return schema.validate(payload);
};



module.exports = {
createTransactionSchema,
createRuleSchema,
}