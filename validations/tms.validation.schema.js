const fs = require('fs')
const arithmeticOperators = require('../data/data')
const Joi = require('joi')



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
  participant: Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.string().valid("actor", "distribution_list", "other").required(),
    role: Joi.string().valid("owner", "user").required(),
    name: Joi.string().required(),
  }),
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
  salience: Joi.number().required(),
  when: Joi.object()
    .custom((value, helper) => {
      const data = fs.readFileSync("data/transactions.json", "utf-8");
      const doc = JSON.parse(data);
      const transactions = Array.from(doc);
      const dataset = value.sentence;
      const { operator } = value;
      if (arithmeticOperators.indexOf(operator) === -1) return helper.message("invalid operator");
      for (let i = 0; i < dataset.length; i += 1) {
        if (!transactions[0][`${dataset[i].modelField}`]) return helper.message("unknown dataset");
        if (arithmeticOperators.indexOf(dataset[i].operator) === -1)
          return helper.message("invalid operator in sentence");
        const senConst = Object.keys(dataset[i]);
        if (senConst[2] !== "const" && typeof dataset[i].const !== "number")
          return helper.message("const must be of type number");
      }
      return value;
    })
    .required(),
  then: Joi.object().required(),
  }).unknown();
  return schema.validate(payload);
};



module.exports = {
createTransactionSchema,
createRuleSchema,
}