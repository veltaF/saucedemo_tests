import { test, expect, Page } from '@playwright/test';
import {loginToSaucedemo} from '../common/lib/login';
import {addProductToTheCart} from '../common/lib/products';
import {selectSortingAndVerifyItIsSelected} from '../common/lib/products';
import {verifyProductSorting} from '../common/lib/products';
import {verifyProductIsOnPage} from '../common/lib/products';
import {verifyCartQuantity} from '../common/lib/products';
import {fillYourInformation} from '../common/lib/checkout';
import data from '../data/testdata';

import { 
    LOGIN_BUTTON,
    PRODUCTS_PAGE_HEADER,
    SHOPPING_CART_LINK,
    CHECKOUT_BUTTON,
    CONTINUE_BUTTON,
    FINISH_BUTTON,
    SUCCESS_PURCHASE_MESSAGE,
    ERROR_BUTTON,
    LOGIN_ERROR
} from '../common/locators';

test.describe.configure({ mode: 'default' });

let page: Page;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(data.baseURL);
});

test.afterEach(async () => {
    await page.close();
});

test('Customer purchases products  @basic', async () => {
    await test.step( "Given standard customer is logged in", async () => {
        await loginToSaucedemo(page, data.standartUser, data.password)
        await expect(page.locator(PRODUCTS_PAGE_HEADER)).toBeVisible();   
    });

    await test.step("When the customer adds multiple products to the shopping cart", async () => {
        await addProductToTheCart(page, "Sauce Labs Backpack")
        await addProductToTheCart(page, "Test.allTheThings() T-Shirt (Red)")
        await addProductToTheCart(page, "Sauce Labs Bolt T-Shirt")
        await verifyCartQuantity(page, 3)
    });

    await test.step("And proceeds to checkout the purchase", async () => {
        await page.locator(SHOPPING_CART_LINK).click();
        await verifyProductIsOnPage(page, "Sauce Labs Backpack")
        await verifyProductIsOnPage(page, "Test.allTheThings() T-Shirt (Red)")
        await verifyProductIsOnPage(page, "Sauce Labs Bolt T-Shirt")
        await verifyCartQuantity(page, 3)

        await page.locator(CHECKOUT_BUTTON).click();
        await fillYourInformation(page,data.standartUserInfo)
        await page.locator(CONTINUE_BUTTON).click();
    });

    await test.step("Then purchase is successful", async () => {
        await verifyProductIsOnPage(page, "Sauce Labs Backpack")
        await verifyProductIsOnPage(page, "Test.allTheThings() T-Shirt (Red)")
        await verifyProductIsOnPage(page, "Sauce Labs Bolt T-Shirt")
        await verifyCartQuantity(page, 3)

        await page.locator(FINISH_BUTTON).click();
        await expect(page.locator(SUCCESS_PURCHASE_MESSAGE)).toBeVisible();
    });
});

const sortingOptions = [
    'Price (low to high)',
    'Price (high to low)',
    'Name (A to Z)',
    'Name (Z to A)'
];
  
for (const sortingOption of sortingOptions) {
    test(`Customer sorts product items as ${sortingOption} @basic`, async () => {
        await test.step( "Given standard customer is logged in", async () => {
            await loginToSaucedemo(page, data.standartUser, data.password)
            await expect(page.locator(PRODUCTS_PAGE_HEADER)).toBeVisible();
        });

        await test.step("When the customer sorts available products in product view", async () => {
            await selectSortingAndVerifyItIsSelected(page, sortingOption)
        });

        await test.step("Then the products are ordered according to the chosen sort method", async () => {
            const isSorted = await verifyProductSorting(page, sortingOption);
            expect(isSorted).toBe(true);
        });    
    });
}

test('User is locked out from the platform  @basic', async () => {
    await test.step("Given customer is a locked out customer", async () => {
    });

    await test.step("When the customer attempts to login using proper credentials", async () => {
        await loginToSaucedemo(page, data.lockedOutUser, data.password)
    });

    await test.step("Then login fails", async () => {
        await expect(page.locator(LOGIN_BUTTON)).toBeVisible();
        await expect(page.locator(ERROR_BUTTON)).toBeVisible();
    });

    await test.step("And the customer is presented with error state", async () => {
        await expect(page.locator(LOGIN_ERROR)).toBeVisible();
    });
});
