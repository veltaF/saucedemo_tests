//login page
export const USERNAME_INPUT = '#user-name';
export const PASSWORD_INPUT = '#password';
export const LOGIN_BUTTON = '#login-button';
export const ERROR_BUTTON = 'button.error-button';
export const LOGIN_ERROR = 'text=Epic sadface: Sorry, this user has been locked out.'

//schopping cart page
export const CHECKOUT_BUTTON = '#checkout';
export const CART_BADGE = '.shopping_cart_badge[data-test="shopping-cart-badge"]';

//products page
export const PRODUCTS_PAGE_HEADER = 'text=Products';
export const SHOPPING_CART_LINK = '#shopping_cart_container > a';
export const PRODUCT_SORT = '.product_sort_container';
export const ACTIVE_OPTION = 'span.active_option:has-text("Price (low to high)")';
export const INVENTORY_ITEM = '.inventory_item[data-test="inventory-item"]';

export const productItem = (productName: string): string => {
    return `.inventory_item_name[data-test="inventory-item-name"]:has-text("${productName}")`; 
};

export const addToCartButton = (productName: string): string => {
    const nameParts = productName.toLowerCase().split(' ');
    const buttonId = `add-to-cart-${nameParts.join('-')}`;
    return `xpath=//button[@id="${buttonId}"]`;    
};

export const removeFromCartButton = (productName: string): string => {
    const nameParts = productName.toLowerCase().split(' ');
    const buttonId = `remove-${nameParts.join('-')}`;
    return `xpath=//button[@id="${buttonId}"]`;
};

//checkout page
export const FIRST_NAME_INPUT = '#first-name';
export const LAST_NAME_INPUT = '#last-name';
export const POSTAL_CODE_INPUT = '#postal-code';
export const CONTINUE_BUTTON = '#continue';
export const FINISH_BUTTON = '#finish';
export const SUCCESS_PURCHASE_MESSAGE = 'text=Thank you for your order!';
