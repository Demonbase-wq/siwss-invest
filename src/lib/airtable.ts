import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export const users = base('Users');
export const transactions = base('Transactions');
export const loan = base('Loans');
export const ticket = base('Tickets');
export const savings = base('Savings');
export const kyc = base('Kyc');
export const check = base('Check');
export const crypto = base('Crypto');
export const wire = base('Wire');
export const local = base('Local');
export const other = base('Other');

export const getTransactions = async (id: string) => {
    const records = await base('Transactions').select({
      filterByFormula: `{user_id} = '${id}'`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export const getTickets = async (id: string) => {
    const records = await ticket.select({
      filterByFormula: `{user_id} = '${id}'`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export const getLoans = async (id: string) => {
    const records = await loan.select({
      filterByFormula: `{user_id} = '${id}'`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export const getSavings = async (id: string, type: string) => {
    const records = await base('Transactions').select({
      filterByFormula: `AND({user_id} = '${id}', {type} = '${type}')`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export async function getUser(email: string) {
  try {
    console.log('Fetching user with email:', email);
    const records = await base('Users')
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      throw new Error('User not found');
    }

    console.log('User found:', records[0].fields);
    return records[0].fields;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
