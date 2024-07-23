import {ICard} from "@/app/types";


export const cardsData: ICard[] = [
    {
        id: '1',
        price: 1,
        type: 'VISA',
        commission: 0.25,
        bonus: 2,
    },
    {
        id: '2',
        price: 2,
        type: 'VISA',
        commission: 0,
        bonus: 2,
    },
    {
        id: '3',
        price: 5,
        type: 'VISA',
        commission: 0.25,
        bonus: 0,
    },
    {
        id: '4',
        price: 10,
        type: 'AMAZON',
        commission: 0,
        bonus: 0,
    },
    {
        id: '5',
        price: 20,
        type: 'AMAZON',
        commission: 0,
        bonus: 2,
    },
    {
        id: '6',
        price: 50,
        type: 'AMAZON',
        commission: 0,
        bonus: 0,
    }
];
