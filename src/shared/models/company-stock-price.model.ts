export interface ICompanyStockPrice {
    id: string;
    created_at: string;
    high: string;
    low: string;
    open: number;
    close: number;
    volume: number;
    transaction_date: string;
    ticker: string;
}
