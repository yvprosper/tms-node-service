const { faker } = require('@faker-js/faker');


const createFakeActor = () => {
  const actor = {
    id: faker.database.mongodbObjectId(),
    actorType: faker.helpers.arrayElement(["individual", "legal_entity"]),
    accountNumber: faker.finance.account(10),
    legalEntity: [
      {
        dateOfRegisteration: faker.datatype.datetime(),
        type: faker.helpers.arrayElement(["sole_proprietorship", "patnership"]),
        industryClassification: faker.helpers.arrayElement(["ict", "agriculture", "medical", "finance"]),
        url: faker.helpers.arrayElement(["www.duumyurl.com", "www.newurl.com"]),
        countryOfIncorporation: faker.address.country()
      },
    ],
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    status: faker.helpers.arrayElement(["active", "terminated"]),
    gender: faker.name.sexType(),
    phones: [
      {
        numberType: faker.helpers.arrayElement(["home", "office"]),
        number: faker.phone.number(),
      },
    ],
    emails: [
      {
        emailType: faker.helpers.arrayElement(["home", "office"]),
        address: faker.internet.email(),
      },
    ],
    addresses: [
      {
        addressType: faker.helpers.arrayElement(["home", "office"]),
        line1: `${faker.address.buildingNumber()} ${faker.address.street()}`,
        line2: faker.address.secondaryAddress(),
        postCode: faker.address.zipCode(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      },
    ],
    governmentIds: [
      {
        idType: faker.helpers.arrayElement(["drivers_license", "bvn", "nin"]),
        governmentId: faker.database.mongodbObjectId(),
        issuingAuthority: faker.company.name(),
        expirationDate: faker.datatype.datetime(),
      },
    ],
    domicile: faker.address.countryCode(),
    createdAt: faker.datatype.datetime(),
  };

  return actor;
};

const createFakeTransaction = () => {
  const transaction = {
    id: faker.database.mongodbObjectId(),
    channel: faker.helpers.arrayElement(["branch", "online", "atm", "pos", "mobile", "unknown"]),
    accountNumber: "2969798617",
    entryDate: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
    amount: faker.commerce.price(),
    localAmount: faker.commerce.price(),
    cardNumber: faker.finance.creditCardNumber(),
    balance: faker.commerce.price(),
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
    internationalTransaction: faker.helpers.arrayElement([true, false]),
    description: faker.lorem.lines(),
    status: faker.helpers.arrayElement([
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
    beneficiary:
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
      "actor": {
        "id": "dc999f40553afc2a332ecfbf",
        "actorType": "individual",
        "accountNumber": "0765641730",
        "legalEntity": [
          {
            "dateOfRegisteration": "2040-08-11T12:18:58.115Z",
            "type": "sole_proprietorship",
            "industryClassification": "agriculture",
            "url": "www.newurl.com",
            "countryOfIncorporation": "Bhutan"
          }
        ],
        "firstName": "Adrien",
        "lastName": "Hahn",
        "status": "active",
        "gender": "male",
        "phones": [
          {
            "numberType": "office",
            "number": "(533) 481-9212 x1980"
          }
        ],
        "emails": [
          {
            "emailType": "office",
            "address": "Leonel24@hotmail.com"
          }
        ],
        "addresses": [
          {
            "addressType": "home",
            "line1": "4314 Erika Path",
            "line2": "Suite 518",
            "postCode": "37202-3555",
            "city": "Fort Lauderdale",
            "state": "New Jersey",
            "country": "Algeria"
          }
        ],
        "governmentIds": [
          {
            "idType": "nin",
            "governmentId": "f82df1ced894c7dced1f2b0f",
            "issuingAuthority": "Kshlerin - Kertzmann",
            "expirationDate": "2083-08-10T11:40:27.829Z"
          }
        ],
        "domicile": "CO",
        "createdAt": "2026-01-21T08:02:34.342Z"
      }
  };

  return transaction;
};


module.exports = {
  createFakeActor,
  createFakeTransaction
}
