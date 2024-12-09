import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

export const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
}

export const transformString = (input) => {
  // Use a regular expression to extract the account number and type
  const match = input.match(/\((\d+)\) ([\w\s]+):/);
  if (match) {
    const accountNumber = match[1];
    const accountType = match[2];
    return `${accountNumber} (${accountType})`;
  }
  return input; // Return the input if it doesn't match the expected format
};

export const containsTransfer = (str) => {
  return str.toLowerCase().includes('transfer');
}

export const extractAmount = (input) => {
  const match = input.match(/\$([0-9]+)/);
  return match ? match[1] : '';
};

export async function fetcherSavings(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
}


