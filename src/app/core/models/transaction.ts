export interface Transaction {
  id?: number;
  fundId: number;
  fundName: string;
  amount: number;
  type: 'SUBSCRIPTION' | 'CANCEL';
  date: string;
  notificationMethod?: 'EMAIL' | 'SMS';
}
