import { expect } from '@playwright/test';
import { 
    addToCartButton,
    removeFromCartButton,
    PRODUCT_SORT,
    INVENTORY_ITEM,
    productItem,
    CART_BADGE
} from '../locators';
import data from '../../data/testdata';

export async function addProductToTheCart (page, productName) {
    await page.locator(addToCartButton(productName)).click();
    await expect(page.locator(removeFromCartButton(productName))).toBeVisible(); 
}

export async function verifyProductIsOnPage (page, productName) {
    await expect(page.locator(productItem(productName))).toBeVisible();
}
  
export async function verifyCartQuantity (page, expectedQuantity) {
    await expect(page.locator(CART_BADGE)).toBeVisible();
    const cartQuantityText = await page.locator(CART_BADGE).innerText();
    expect(parseInt(cartQuantityText)).toBe(expectedQuantity);
}

export async function selectSortingAndVerifyItIsSelected(page, sortingType) {
    const optionValue = data.sortingOptions[sortingType];
  
    if (!optionValue) {
      throw new Error(`Unsupported sorting type: ${sortingType}`);
    }
  
    await page.locator(PRODUCT_SORT).selectOption({ value: optionValue });
    const optionElement = await page.locator(`span.active_option >> text=${sortingType}`);
  
    await expect(optionElement).toBeVisible();
}

export async function verifyProductSorting(page, sortingText) {
    const products = await extractProducts(page); 
  
    if (!products) {
      throw new Error('Failed to extract product data from inventory items'); 
    }
  
    //Check if products are sorted according to the specified criteria
    const isSorted = products.every((product, index) => {
        if (index === 0) return true; 
    
        switch (sortingText) {
            case 'Price (low to high)':
                return product.price >= products[index - 1].price;
            case 'Price (high to low)':
                return product.price <= products[index - 1].price;
            case 'Name (A to Z)':
                return product.name.localeCompare(products[index - 1].name) >= 0;
            case 'Name (Z to A)':
                return product.name.localeCompare(products[index - 1].name) <= 0;
            default:
                throw new Error(`Unknown sorting text: ${sortingText}`);
        }
    });
    return isSorted;
}

/**
 * Extracts name, price and index for each product of the page to products array 
 */
async function extractProducts(page) {
    try {
        //Find all inventory items on the page
        const inventoryItems = await page.locator(INVENTORY_ITEM);

        const products = await inventoryItems.evaluateAll(items => {    
            return items.map((item, index) => {
                //Extract price information  
                const priceElement = item.querySelector('.inventory_item_price');
                const priceText = priceElement?.textContent; 
                const price = priceText ? parseFloat(priceText.slice(1)) : null; 

                //Extract name information
                const nameElement = item.querySelector('.inventory_item_name'); 
                const nameText = nameElement?.textContent?.toLowerCase();

                return {
                    price,
                    name: nameText,
                    index: index,
                };
            });
        });
        return products;
    } 
    catch (error) {
        console.error('Error extracting product data:', error);
        return null; 
    }
}  
