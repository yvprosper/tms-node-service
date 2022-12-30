const { faker } = require('@faker-js/faker');


const createFakeActor = () => {
  const actor = {
    Id: faker.database.mongodbObjectId(),
    Type: faker.helpers.arrayElement(["individual", "legal_entity"]),
    AccountNumber: faker.finance.account(10),
    LegalEntity: [
      {
        DateOfRegisteration: faker.datatype.datetime(),
        Type: faker.helpers.arrayElement(["sole_proprietorship", "patnership"]),
        IndustryClassification: faker.helpers.arrayElement(["ict", "agriculture", "medical", "finance"]),
        Url: faker.helpers.arrayElement(["www.duumyurl.com", "www.newurl.com"]),
        CountryOfIncorporation: faker.address.country()
      },
    ],
    CompanyName: faker.company.name(),
    FirstName: faker.name.firstName(),
    LastName: faker.name.lastName(),
    DisplayName: faker.name.fullName(),
    Status: faker.helpers.arrayElement(["active", "terminated"]),
    Monitored: faker.helpers.arrayElement(["yes", "no"]),
    Gender: faker.name.sexType(),
    PhoneNumber: [
      {
        Type: faker.helpers.arrayElement(["home", "office"]),
        Number: faker.phone.number(),
      },
    ],
    Email: [
      {
        Type: faker.helpers.arrayElement(["home", "office"]),
        Address: faker.internet.email(),
      },
    ],
    DateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    Address: [
      {
        AddressType: faker.helpers.arrayElement(["home", "office"]),
        Line1: `${faker.address.buildingNumber()} ${faker.address.street()}`,
        Line2: faker.address.secondaryAddress(),
        PostCode: faker.address.zipCode(),
        City: faker.address.city(),
        State: faker.address.state(),
        Country: faker.address.country(),
      },
    ],
    GovernmentId: [
      {
        Type: faker.helpers.arrayElement(["drivers_license", "bvn", "nin"]),
        Id: faker.database.mongodbObjectId(),
        IssuingAuthority: faker.company.name(),
        ExpirationDate: faker.datatype.datetime(),
      },
    ],
    SocialAccounts: [
      {
        Type: faker.helpers.arrayElement(["facebook", "twitter", "instagram"]),
        Account: `${faker.name.firstName()}_tms`,
      },
    ],
    CountryCode: faker.address.countryCode(),
    Domicile: faker.address.countryCode(),
    ValidationStatus: faker.helpers.arrayElement([
      "unvalidated",
      "validated",
      "due_deligence",
      "vendor_suplied_data",
      "manual_entry",
    ]),
    CreatedAt: faker.datatype.datetime(),
  };

  return actor;
};

const createFakeTransaction = () => {
  const transaction = {
    Id: faker.database.mongodbObjectId(),
    Channel: faker.helpers.arrayElement(["branch", "online", "atm", "pos", "mobile", "unknown"]),
    AccountNumber: faker.finance.account(10),
    TransactionDate: faker.datatype.datetime(),
    TransactionAmount: faker.commerce.price(),
    LocalTransactionAmount: faker.commerce.price(),
    CardNumber: faker.finance.creditCardNumber(),
    AccountBalance: faker.commerce.price(),
    ChannelLocation: faker.address.city(),
    Category: faker.helpers.arrayElement(["deposit", "withdrawal", "transfer", "webPurchase"]),
    TransactionMethod: faker.helpers.arrayElement([
      "fee",
      "interest",
      "cash",
      "check",
      "payment",
      "direct_debit",
      "transfer",
      "reversal",
    ]),
    Currency: faker.finance.currencyCode(),
    CheckNumber: faker.finance.creditCardNumber(),
    ChannelIpAddress: faker.internet.ipv4(),
    InternationalTransfer: faker.helpers.arrayElement([true, false]),
    Description: faker.lorem.lines(),
    TransactionStatus: faker.helpers.arrayElement([
      "completed",
      "pending",
      "accepted",
      "rejected",
      "canceled",
      "acknowledged",
      "paused",
    ]),
    MerchantCategoryCode: faker.datatype.number(10000),
    MerchantCountryCode: faker.address.countryCode(),
    TransactionBeneficiary:
      {
        Id: faker.database.mongodbObjectId(),
        Type: faker.helpers.arrayElement(["individual", "legal_entity"]),
        Name: faker.name.fullName(),
        AccountNumber: faker.finance.account(10),
        Address: `${faker.address.buildingNumber()} ${faker.address.street()},${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`,
        BankName: faker.helpers.arrayElement(["First", "GTB", "Fidelity", "UBA"]),
        Bic: faker.datatype.number(100000000000),
        Iban: faker.datatype.number(100000000000000),
        MerchantCategoryCode: faker.datatype.number(10000),
        MerchantCountryCode: faker.address.countryCode(),
      },
    CreatedAt: faker.datatype.datetime(),
  };

  return transaction;
};


module.exports = {
  createFakeActor,
  createFakeTransaction
}
