import { expect } from '@playwright/test';
import { 
    USERNAME_INPUT,
    PASSWORD_INPUT,
    LOGIN_BUTTON
} from '../locators';

export async function loginToSaucedemo (page, username, password) {
    await expect(page.locator('text=Swag Labs')).toBeVisible();
    
    await page.locator(USERNAME_INPUT).fill(username);
    await page.locator(PASSWORD_INPUT).fill(password);
    await page.locator(LOGIN_BUTTON).click();  
}
