import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export const users = base('Users');
export const transactions = base('Transactions');
export const ticket = base('Tickets');
export const investmentsTable = base("Investments");
export const dailyProfits = base("Daily Profits");
export const kyc = base('Kyc');
export const referrals = base('Referrals');
export const deposits = base('Deposits');
export const withdrawals = base('Withdrawals');


export const getTransactions = async (id: string) => {
    const records = await base('Transactions').select({
      filterByFormula: `{user_id} = '${id}'`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export const getReferrals = async (id: string) => {
    const records = await referrals.select({
      filterByFormula: `{referrer_id} = '${id}'`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};


export const getInvestments = async (id: string) => {
    const records = await investmentsTable.select({
      filterByFormula: `AND({user_id} = '${id}', {status} = 'Active')`,
    }).all();
    return records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));
};

export const getDailyProfits = async (id: string) => {
    const records = await dailyProfits.select({
      filterByFormula: `{investment_id} = '${id}'`,
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
