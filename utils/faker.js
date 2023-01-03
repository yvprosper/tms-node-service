const { faker } = require('@faker-js/faker');


const createFakeActor = () => {
  const actor = {
    Id: faker.database.mongodbObjectId(),
    ActorType: faker.helpers.arrayElement(["individual", "legal_entity"]),
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
    FirstName: faker.name.firstName(),
    LastName: faker.name.lastName(),
    Status: faker.helpers.arrayElement(["active", "terminated"]),
    Gender: faker.name.sexType(),
    Phones: [
      {
        NumberType: faker.helpers.arrayElement(["home", "office"]),
        Number: faker.phone.number(),
      },
    ],
    Emails: [
      {
        EmailType: faker.helpers.arrayElement(["home", "office"]),
        Address: faker.internet.email(),
      },
    ],
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
        IdType: faker.helpers.arrayElement(["drivers_license", "bvn", "nin"]),
        GovernmentId: faker.database.mongodbObjectId(),
        IssuingAuthority: faker.company.name(),
        ExpirationDate: faker.datatype.datetime(),
      },
    ],
    Domicile: faker.address.countryCode(),
    CreatedAt: faker.datatype.datetime(),
  };

  return actor;
};

const createFakeTransaction = () => {
  const transaction = {
    Id: faker.database.mongodbObjectId(),
    Channel: faker.helpers.arrayElement(["branch", "online", "atm", "pos", "mobile", "unknown"]),
    AccountNumber: "2969798617",
    EntryDate: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
    Amount: faker.commerce.price(),
    LocalAmount: faker.commerce.price(),
    CardNumber: faker.finance.creditCardNumber(),
    Balance: faker.commerce.price(),
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
    InternationalTransaction: faker.helpers.arrayElement([true, false]),
    Description: faker.lorem.lines(),
    Status: faker.helpers.arrayElement([
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
    Beneficiary:
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
      "Actor": {
        "Id": "a2a23b5dde3467eeab1ebcea",
        "ActorType": "legal_entity",
        "AccountNumber": "2969798617",
        "LegalEntity": [
          {
            "DateOfRegisteration": "2013-04-14T01:24:17.320Z",
            "Type": "patnership",
            "IndustryClassification": "agriculture",
            "Url": "www.duumyurl.com",
            "CountryOfIncorporation": "Poland"
          }
        ],
        "FirstName": "Ocie",
        "LastName": "Barrows",
        "Status": "active",
        "Phones": [
          {
            "NumberType": "office",
            "Number": "1-992-793-3997 x306"
          }
        ],
        "Emails": [
          {
            "EmailType": "office",
            "Address": "ociebarrowsinc@hotmail.com"
          }
        ],
        "Address": [
          {
            "AddressType": "office",
            "Line1": "96566 Gleichner Course",
            "Line2": "Suite 377",
            "PostCode": "03620",
            "City": "North Destiniton",
            "State": "Georgia",
            "Country": "Israel"
          }
        ],
        "GovernmentId": [
          {
            "IdType": "cac",
            "GovernmentId": "2539ec6a0d5d8703d997a7ca",
            "IssuingAuthority": "cac",
            "ExpirationDate": "2017-09-15T11:06:19.110Z"
          }
        ],
        "Domicile": "NA",
        "CreatedAt": "2087-02-05T21:54:34.195Z"
      },
      "ActorPepMatch": true,
      "ActorCrimeListMatch": false,
      "ActorWatchListMatch": false,
      "ActorSanctionListMatch": false,
      "BeneficiaryPepMatch": true,
      "BeneficiaryCrimeListMatch": true,
      "BeneficiaryWatchListMatch": true,
      "BeneficiarySanctionListMatch": true,
      "CreatedAt": "2003-10-20T04:25:13.946Z"
  };

  return transaction;
};


module.exports = {
  createFakeActor,
  createFakeTransaction
}
