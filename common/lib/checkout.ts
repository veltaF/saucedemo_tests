import { 
    FIRST_NAME_INPUT,
    LAST_NAME_INPUT,
    POSTAL_CODE_INPUT
} from '../locators';

export async function fillYourInformation (page, user) {
    await page.locator(FIRST_NAME_INPUT).fill(user.firstName);
    await page.locator(LAST_NAME_INPUT).fill(user.lastName);
    await page.locator(POSTAL_CODE_INPUT).fill(user.postalCode);  
}
