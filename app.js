const express = require('express')
const { faker } = require('@faker-js/faker');
const fs = require('fs')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

const {createFakeActor, createFakeTransaction} = require('./utils/faker')
const {
    createTransactionSchema,
    createRuleSchema,
    } = require('./validations/tms.validation.schema')
const arrangeRuleObject = require('./utils/tms.utils')
const {
    produceMessage,
    consumeMessage
} = require('./utils/kafka')


app.get('/', (req, res) => {
    res.status(200).json({
        message: "API v1  is running",
        env: process.env.NODE_ENV,
        serviceName: process.env.SERVICE_NAME,
      });
})

app.post('/v1/tms/actors/generate', (req, res) => {
        try {
          const actors = [];
          for (let i = 0; i < 10; i += 1) {
            const actor = createFakeActor();
            actors.push(actor);
          }
          actors.map((actor) => {
            if (actor.ActorType === "individual") {
              // eslint-disable-next-line no-param-reassign
              delete actor.LegalEntity;
            }
            if (actor.ActorType === "legal_entity") {
              // eslint-disable-next-line no-param-reassign
              delete actor.Gender;
            }
            return actor;
          });
          const alreadySavedActors = fs.readFileSync(
            "data/actors.json",
            "utf-8"
          );
          const doc = JSON.parse(alreadySavedActors);
          const arr = Array.from(doc);
  
          for (let i = 0; i < actors.length; i += 1) {
            arr.push(actors[i]);
          }
  
          const data = JSON.stringify(arr, null, 2);
          fs.writeFile("data/actors.json", data, (err) => {
            if (err) {
              throw new Error("error saving actors to json file");
            }
            console.log("successful");
          });
          res.status(201).json({
            success: true,
            msg: "sucessfully generated actors",
            data: actors,
          });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                msg: "something went wrong",
                error,
              });
        }
})

app.post('/v1/tms/transactions/generate', (req, res) => {
    try {
        const transactions = [];
        for (let i = 0; i < 20; i += 1) {
          const transaction = createFakeTransaction();
          transactions.push(transaction);
        }

        transactions.map((transaction) => {
          if (transaction.TransactionMethod !== "check") {
            delete transaction.CheckNumber;
          }
          if (transaction.Actor.ActorType === "individual") {
            // eslint-disable-next-line no-param-reassign
            delete transaction.Actor.LegalEntity;
          }
          if (transaction.Actor.ActorType === "legal_entity") {
            // eslint-disable-next-line no-param-reassign
            delete transaction.Actor.Gender;
          }
          return transaction;
        });

        const alreadySavedTransactions = fs.readFileSync(
          "data/transactions.json",
          "utf-8"
        );
        const doc = JSON.parse(alreadySavedTransactions);
        const arr = Array.from(doc);

        for (let i = 0; i < transactions.length; i += 1) {
          arr.push(transactions[i]);
        }

        const data = JSON.stringify(arr, null, 2);
        fs.writeFile("data/transactions.json", data, (err) => {
          if (err) {
            throw new Error("error saving transactions to json file");
          }
          console.log("successful");
        });
        res.status(201).json({
            success: true,
            msg: "sucessfully generated transactions",
            data: transactions,
          });
      } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            msg: "something went wrong",
            error,
        });
      }
})

app.post('/v1/tms/rule/new', async (req, res) => {
    const payload = req.body
    const {error} = await createRuleSchema(payload)
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    })
    try {
      const newRule = arrangeRuleObject(payload);
      if (!fs.existsSync(`workflows/${payload.workFlow}`)) {
        let arr = []
        arr.push(newRule)
        const data = JSON.stringify(arr, null, 2);
        fs.mkdirSync(`workflows/${payload.workFlow}`)
        fs.writeFileSync(`workflows/${payload.workFlow}/v${payload.version}.json`,data)
      } else {
        if (!fs.existsSync(`workflows/${payload.workFlow}/v${payload.version}.json`)){
          const alreadySavedRules = fs.readFileSync(
            `workflows/${payload.workFlow}/v${payload.version - 1}.json`,
            "utf-8"
          );

          const doc = JSON.parse(alreadySavedRules);
          const arr = Array.from(doc);
          arr.push(newRule)
          const data = JSON.stringify(arr, null, 2);
          fs.writeFileSync(`workflows/${payload.workFlow}/v${payload.version}.json`, data)
        } 
      }
      const data = fs.readFileSync(
        `workflows/${payload.workFlow}/v${payload.version}.json`,
        "utf-8"
      );
        const msg = {
          workflow: payload.workFlow,
          version: payload.version,
          data
        }
       await produceMessage("rule-topic", JSON.stringify(msg))
        res.status(201).json({
            success: true,
            msg: "sucessfully created rule",
            data: newRule,
          });
      } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            msg: "something went wrong",
            error,
        });
      }
})

app.post('/v1/tms/transaction/new', async (req, res) => {
    const payload = req.body
    const {error} = await createTransactionSchema(payload)
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    })
    try {
        const accountNumber = payload.AccountNumber;
        const actors = fs.readFileSync("data/actors.json", "utf-8");
        const doc = JSON.parse(actors);
        const Actors = Array.from(doc);

        const transactions = fs.readFileSync(
          "data/transactions.json",
          "utf-8"
        );
        const doc1 = JSON.parse(transactions);
        const Transaction = Array.from(doc1);

        let newTransaction;
        Actors.map((actor) => {
          if (actor.accountNumber === accountNumber) {
            newTransaction = {
              Id: faker.database.mongodbObjectId(),
              ...payload,
              Actor: actor,
              ActorPepMatch: faker.helpers.arrayElement([true, false]),
              ActorCrimeListMatch: faker.helpers.arrayElement([true, false]),
              ActorWatchListMatch: faker.helpers.arrayElement([true, false]),
              ActorSanctionListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryPepMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryCrimeListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryWatchListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiarySanctionListMatch: faker.helpers.arrayElement([true, false]),
              CreatedAt: faker.datatype.datetime(),
              
            };
          }
          return actor;
        });
        if (newTransaction === undefined) {
            const data = {
              Id: faker.database.mongodbObjectId(),
                ...payload,
              ActorPepMatch: faker.helpers.arrayElement([true, false]),
              ActorCrimeListMatch: faker.helpers.arrayElement([true, false]),
              ActorWatchListMatch: faker.helpers.arrayElement([true, false]),
              ActorSanctionListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryPepMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryCrimeListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiaryWatchListMatch: faker.helpers.arrayElement([true, false]),
              BeneficiarySanctionListMatch: faker.helpers.arrayElement([true, false]),
              CreatedAt: faker.datatype.datetime(),
              }
          Transaction.push(data);
          const msg = JSON.stringify(data)
         await produceMessage("enriched_transaction_request", msg) 
        } else {
          Transaction.push(newTransaction); 
          const msg = JSON.stringify(newTransaction)
          await produceMessage("enriched_transaction_request", msg)        
        }
        

        const data = JSON.stringify(Transaction, null, 2);
        fs.writeFile("data/transactions.json", data, (err) => {
          if (err) {
            throw new Error("error saving transaction to json file");
          }
          console.log("successful");
        });
        res.status(201).json({
            success: true,
            msg: "sucessfully created rule",
            data: JSON.parse(data),
          });
      } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            msg: "something went wrong",
            error,
        });
      }
})

app.listen(port, async () => {
   await consumeMessage("rule-topic")
    console.log(`server is up and running on port ${port}`)

})