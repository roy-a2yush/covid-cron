require('dotenv').config();
const fetch = require('node-fetch')

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        "https://covid-plasma.herokuapp.com/v1/graphql",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': process.env.HASURA_SECRET
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );
  
    return await result.json();
}
  
function executeEmailCountReset() {
    return fetchGraphQL(
        operationsDocEmailCountReset,
        "EmailCountReset",
        {}
    );
}

function executeEmailReset() {
    return fetchGraphQL(
        operationsDocEmailReset,
        "EmailReset",
        {}
    );
}
  
  async function startExecuteEmailCountReset() {
    const { errors, data } = await executeEmailCountReset();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }

async function startExecuteEmailReset() {
    const { errors, data } = await executeEmailReset();
  
    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
}
  
  
const operationsDocEmailReset = `
    mutation EmailReset {
        update_emails(where: {}, _set: {num_emails_sent: 0}) {
            affected_rows
        }
    }
`;

const operationsDocEmailCountReset = `
    mutation EmailCountReset {
        update_users(where: {}, _set: {email_count: 0}) {
            affected_rows
        }
    }
`;
  
startExecuteEmailReset();
startExecuteEmailCountReset();