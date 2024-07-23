

export const priceConvert = (price: number) => {
    return price.toFixed(2);
}

export const priceConverterToToken = (price: number) => {
    return price * 1000;
}

export const priceConverterToTokenWithCommission = (price: number, commis:number) => {
    if(commis > 0) {
           return (price + commis)*1000;
    } else {
        return price*1000;
    }
}


