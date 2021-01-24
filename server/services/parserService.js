const cherio = require('cherio');
const { PuppeteerHandler } = require('../helpers/puppeteer');

const AUCHAN = 'https://auchan.zakaz.ua/ru/search/?q=';
const EPICENTR = 'https://epicentrk.ua/search/?q=';
const FOZZYSHOP = 'https://fozzyshop.ua/ru/search?controller=search&s=';
const epicentrName = 'epicentrk.ua';
const auchanName = 'auchan.zakaz.ua';
const fozzyshopName = 'fozzyshop.ua';

const puppeteer = new PuppeteerHandler();

export const parserService = {
    async getDataFromSites(searchQuery) {
        const cleanQuery = cleanString(searchQuery);
        const epicentrItems = await this.getEpicentrItems(cleanQuery);
        const auchanItems = await this.getAuchanItems(cleanQuery);
        const fozzyshopItems = await this.getFozzyshopItems(cleanQuery);

        return [
            ...epicentrItems,
            ...auchanItems,
            ...fozzyshopItems,
        ];
    },

    async getEpicentrItems(searchQuery) {
        try {
            const pageContent = await puppeteer.getPageContent(EPICENTR + searchQuery);
            const $ = cherio.load(pageContent);
            const cardWrapper = $('#bottom-sticky .card-wrapper');
            let items = [];

            if (!$(cardWrapper).length) {
                return items;
            }

            $(cardWrapper).each((i, item) => {
                const card = $(item).children().children();
                const image = $(card).find('.card__photo img').attr('src');
                const name = $(card).find('.card__name .custom-link .nc').text();
                const price = $(card).find('.card__price .card__price-row .card__price-actual').children().text();
                const brand = $(card).find('.card__characteristics li').first().text();
                const weight = $(card).find('.card__characteristics li').first().next().text();

                const newItem = {
                    name: cleanString(name),
                    image,
                    price: getNumberFromString(price),
                    brand: cleanString(brand.split(':')[1]),
                    weight: convertToKg(getNumberFromString(weight)),
                    site: epicentrName,
                }
                
                items = [ ...items, newItem ];
            });

            return items;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    },

    async getAuchanItems(searchQuery) {
        try {
            const pageContent = await puppeteer.getPageContent(AUCHAN + searchQuery);
            const $ = cherio.load(pageContent);
            const cardWrapper = $('.products-box__list .products-box__list-item');
            const items = [];

            if (!$(cardWrapper).length) {
                return items;
            }

            $(cardWrapper).each( async (i, item) => {
                const card = $(item).children();
                const image = $(card).find('.product-tile__image .product-tile__image-i').attr('src');
                const name = $(card).find('.product-tile__details .product-tile__title-wrapper span').text();
                const price = $(card).find('.product-tile__details .product-tile__prices span').text();

                const detailsLink = $(card).attr('href');
                const { brand, weight } = await this.getAuchanItemDetails(detailsLink);

                const newItem = {
                    name: cleanString(name),
                    image,
                    price: getNumberFromString(price),
                    brand,
                    weight,
                    site: auchanName,
                }
                
                items = [ ...items, newItem ];
            });

            return items;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    },

    async getAuchanItemDetails(link) {
        try {
            const detailsContent = await puppeteer.getPageContent('https://' + auchanName + link);
            const $ = cherio.load(detailsContent);
            const detailsWrapper = $('.big-product-card__facts-list li');

            if (!$(detailsWrapper).length) {
                return {
                    brand: 'Не відомий',
                    weight: 0,
                };
            }

            const brand = $(detailsWrapper).find(".BigProductCardTrademarkName").text();
            const weight = $(detailsWrapper).find("div[data-marker='product_weight']").text();

            return {
                brand: cleanString(brand) || 'Не відомий',
                weight: weight ? getWeightFromDiffValues(weight) : 0,
            };
        } catch (error) {
            console.log(error.message);
            return {
                brand: 'Не відомий',
                weight: 0,
            };
        }
    },
    
    async getFozzyshopItems(searchQuery) {
        try {
            const pageContent = await puppeteer.getPageContent(FOZZYSHOP + searchQuery);
            const $ = cherio.load(pageContent);
            const cardWrapper = $('.products .js-product-miniature-wrapper');
            let items = [];

            if (!$(cardWrapper).length) {
                return items;
            }

            $(cardWrapper).each( async (i, item) => {
                const card = $(item).children();
                const image = $(card).find('.thumbnail-container a img').attr('src');
                const name = $(card).find('.product-title a').text();
                const price = $(card).find('.product-price-and-shipping a span').attr('content');

                const detailsLink = $(card).find('.product-title a').attr('href');
                const { brand, weight } = await this.getFozzyshopItemDetails(detailsLink);

                const newItem = {
                    name: cleanString(name),
                    image,
                    price: getNumberFromString(price),
                    brand,
                    weight,
                    site: fozzyshopName,
                }
                
                items = [ ...items, newItem ];
            });

            return items;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    },

    async getFozzyshopItemDetails(link) {
        try {
            const detailsContent = await puppeteer.getPageContent(link);
            const $ = cherio.load(detailsContent);
            const detailsWrapper = $('.data-sheet');

            if (!$(detailsWrapper).children().length) {
                return {
                    brand: 'Не відомий',
                    weight: 0,
                };
            }

            const brand = $(detailsWrapper).children('meta').attr('content');
            const weight = $(detailsWrapper).last().text();

            return {
                brand: cleanString(brand) || 'Не відомий',
                weight: weight ? getWeightFromDiffValues(weight) : 0,
            };
        } catch (error) {
            console.log(error.message);
            return {
                brand: 'Не відомий',
                weight: 0,
            };
        }
    },
}

const getWeightFromDiffValues = value => {
    const isKg = value.includes('кг');
    const haveParts = value.includes('*');

    if (haveParts) {
        const parts = value.split('*');
        const grValue = parts.reduce((res, part) => {
            const numValue = getNumberFromString(part);
            return res * numValue;
        }, 1);
        return convertToKg(grValue);
    }

    const parsedNumber = getNumberFromString(value)
    if (isKg) {
        return parsedNumber;
    }

    return convertToKg(parsedNumber);
}

const getNumberFromString = string => {
    const parts = string.match(/\d+/g);

    if (!parts) {
        return undefined;
    }

    if (parts.length > 1) {
        return Number(parts.join('.'));
    }

    return Number(parts[0]);
}

const cleanString = string => {
    return string ? string.replace('\\n', '').trim() : '';
}

const convertToKg = grValue => grValue / 1000;