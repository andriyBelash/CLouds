export interface ICoord {
    longitude: number;
    latitude: number;
}

export interface Coord{
    coords: ICoord
}

export interface IWeather {
    main: string;
    description: string;
    icon: string;
}

export interface IWind {
    wind: number
}

export interface IMain{
    temp: number;
    humidity: number;
}

export interface Weather {
    dt_txt: string;
    main: IMain;
    weather: IWeather[]
    wind: IWind;
}
