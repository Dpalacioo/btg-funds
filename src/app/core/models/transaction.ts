import { TransactionType } from './transaction-type';

export interface Transaction {
  id?: number;
  fundId: number;
  fundName: string;
  amount: number;
  type: TransactionType;
  date: string;
  notificationMethod?: 'EMAIL' | 'SMS';
}