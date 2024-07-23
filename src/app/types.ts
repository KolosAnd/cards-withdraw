
export interface ICard {
    id: string;
    price: number;
    type: CardType;
    commission: number;
    bonus: number;
}

export type CardType = "VISA" | "AMAZON";

export interface UserBalance {
    balance: number;
    isFrozen: boolean;
}
