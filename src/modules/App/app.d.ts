
interface IGlobal {
    language: string;
    time_zone: ITimeZone;
}

interface ITimeZone {
    id: string;
    value: string;
}

interface IEtherPrice {
    priceUsd: number,
    priceBtc: number,
    isUp: boolean,
    percent: number
}
