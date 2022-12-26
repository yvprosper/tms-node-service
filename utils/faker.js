const { faker } = require('@faker-js/faker');


const createFakeActor = () => {
  const actor = {
    _id: faker.database.mongodbObjectId(),
    type: faker.helpers.arrayElement(["individual", "legal_entity"]),
    subType: faker.helpers.arrayElement(["employee", "customer"]),
    legalEntity: [
      {
        dateOfRegisteration: faker.datatype.datetime(),
        type: faker.helpers.arrayElement(["sole_proprietorship", "patnership"]),
        industry: faker.helpers.arrayElement(["ict", "agriculture", "medical", "finance"]),
        url: faker.helpers.arrayElement(["www.duumyurl.com", "www.newurl.com"]),
      },
    ],
    companyName: faker.company.name(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    displayName: faker.name.fullName(),
    status: faker.helpers.arrayElement(["active", "terminated"]),
    monitored: faker.helpers.arrayElement(["yes", "no"]),
    gender: faker.name.sexType(),
    phoneNumber: [
      {
        type: faker.helpers.arrayElement(["home", "office"]),
        number: faker.phone.number(),
      },
    ],
    email: [
      {
        type: faker.helpers.arrayElement(["home", "office"]),
        address: faker.internet.email(),
      },
    ],
    dateOfBirth: faker.date.birthdate(),
    address: [
      {
        type: faker.helpers.arrayElement(["home", "office"]),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      },
    ],
    governmentId: [
      {
        type: faker.helpers.arrayElement(["drivers_license", "bvn", "nin"]),
        id: faker.database.mongodbObjectId(),
        expirationDate: faker.datatype.datetime(),
      },
    ],
    socialAccounts: [
      {
        type: faker.helpers.arrayElement(["facebook", "twitter", "instagram"]),
        account: `${faker.name.firstName()}_tms`,
      },
    ],
    countryCode: faker.address.countryCode(),
    domicile: faker.address.countryCode(),
    validationStatus: faker.helpers.arrayElement([
      "unvalidated",
      "validated",
      "due_deligence",
      "vendor_suplied_data",
      "manual_entry",
    ]),
    createdAt: faker.datatype.datetime(),
  };

  return actor;
};

const createFakeTransaction = () => {
  const transaction = {
    _id: faker.database.mongodbObjectId(),
    channel: faker.helpers.arrayElement(["branch", "online", "atm", "pos", "mobile", "unknown"]),
    accountNumber: "96823530",
    transactionDate: faker.datatype.datetime(),
    transactionAmount: faker.commerce.price(),
    localTransactionAmount: faker.commerce.price(),
    cardNumber: faker.finance.creditCardNumber(),
    accountBalance: faker.commerce.price(),
    channelLocation: faker.address.city(),
    category: faker.helpers.arrayElement(["deposit", "withdrawal", "transfer", "webPurchase"]),
    transactionMethod: faker.helpers.arrayElement([
      "fee",
      "interest",
      "cash",
      "check",
      "payment",
      "direct_debit",
      "transfer",
      "reversal",
    ]),
    currency: faker.finance.currencyCode(),
    checkNumber: faker.finance.creditCardNumber(),
    channelIpAddress: faker.internet.ipv4(),
    internationalTransfer: faker.helpers.arrayElement([true, false]),
    description: faker.lorem.lines(),
    transactionStatus: faker.helpers.arrayElement([
      "completed",
      "pending",
      "accepted",
      "rejected",
      "canceled",
      "acknowledged",
      "paused",
    ]),
    merchantCategoryCode: faker.datatype.number(10000),
    merchantCountryCode: faker.address.countryCode(),
    participant:
      {
        id: faker.database.mongodbObjectId(),
        type: faker.helpers.arrayElement(["actor", "distribution_list", "other"]),
        role: faker.helpers.arrayElement(["owner", "user"]),
        name: faker.name.fullName(),
      },
    transactionBeneficiary:
      {
        id: faker.database.mongodbObjectId(),
        type: faker.helpers.arrayElement(["individual", "legal_entity"]),
        name: faker.name.fullName(),
        accountNumber: faker.finance.account(10),
        address: `${faker.address.buildingNumber()} ${faker.address.street()},${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`,
        bankName: faker.helpers.arrayElement(["First", "GTB", "Fidelity", "UBA"]),
        bic: faker.datatype.number(100000000000),
        iban: faker.datatype.number(100000000000000),
        merchantCategoryCode: faker.datatype.number(10000),
        merchantCountryCode: faker.address.countryCode(),
      },
    dateOfLastActivity: faker.datatype.datetime(),
    createdAt: faker.datatype.datetime(),
  };

  return transaction;
};


module.exports = {
  createFakeActor,
  createFakeTransaction
}
