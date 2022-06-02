export interface HistoryItem {
  message?: string;
  phoneNumber: string;
  date: string;
}

export interface HistoryResponse {
  historyItems: HistoryItem[];
}
