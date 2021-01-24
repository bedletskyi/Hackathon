import { SET_PRODUCTS_TO_SHOW, SET_PRODUCTS } from './productCardActions';

const initialState = {
    products: [
        {
            name: 'mem',
            image: 'https://i2.rozetka.ua/goods/20812039/asus_90mp0210_bpua00_images_20812039341.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
        {
            name: 'mem',
            image: 'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
            brand: 'Asus',
            weight: 100,
            price: 50,
            site: 'https://rozetka.com.ua/',
        },
    ],
    productsToShow: [],
};

export default function productsData(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_TO_SHOW:
            return { ...state, productsToShow: action.products };
        case SET_PRODUCTS:
            return { ...state, products: action.products };
        default:
            return state;
    }
}
