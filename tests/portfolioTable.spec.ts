import { test, expect } from '@playwright/test';

test.describe('Portfolio table tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Portafolio' }).click();
    });

    test('should visualize the list of portfolio items', async ({ page }) => {
        const heading = page.getByRole('heading', { name: 'Mi Portafolio' });
        await expect(heading).toBeVisible();

        const rowData = page.locator("tbody tr:nth-child(1) td:nth-child(1)");
        await expect(rowData).toBeVisible();
    });

    test('should view the details of a portfolio item', async ({ page }) => {
        const firstRowActions = page.locator("tbody tr:nth-child(1) td:nth-child(4) button[aria-label='Actions']");
        await firstRowActions.click();

        await page.getByRole('button', { name: 'Ver Detalle' }).click();

        const modal = page.locator('dialog');
        await expect(modal).toBeVisible();

        await expect(modal.getByText('Categoría')).toBeVisible();
        await expect(modal.getByText('Moneda')).toBeVisible();
        await expect(modal.getByText('Valor Actual')).toBeVisible();

        await page.getByRole('button', { name: 'Cerrar' }).click();
        await expect(modal).not.toBeVisible();
    });

    test('should sell a fund and validate inputs', async ({ page }) => {
        const availableQuantityText = await page.locator("tbody tr:nth-child(1) td:nth-child(2)").textContent();
        const availableQuantity = parseInt(availableQuantityText || "0");

        const firstRowActions = page.locator("tbody tr:nth-child(1) td:nth-child(4) button[aria-label='Actions']");
        await firstRowActions.click();

        await page.getByRole('button', { name: 'Vender' }).click();

        const modal = page.locator('dialog');
        await expect(modal).toBeVisible();

        const quantityInput = page.locator('input#quantity');
        const sellButton = modal.getByRole('button', { name: 'Vender' });

        await quantityInput.fill('0');
        await expect(page.getByText('La cantidad debe ser mayor a 0')).toBeVisible();
        await expect(sellButton).toBeDisabled();
        await quantityInput.fill((availableQuantity + 1).toString());
        await expect(page.getByText(`No puedes vender más de ${availableQuantity}`)).toBeVisible();
        await expect(sellButton).toBeDisabled();

        await quantityInput.fill('1');
        await expect(sellButton).toBeEnabled();
        await sellButton.click();

        await expect(modal).not.toBeVisible();
    });

    test('should transfer a fund and validate inputs', async ({ page }) => {
        const availableQuantityText = await page.locator("tbody tr:nth-child(1) td:nth-child(2)").textContent();
        const availableQuantity = parseInt(availableQuantityText || "0");

        const firstRowActions = page.locator("tbody tr:nth-child(1) td:nth-child(4) button[aria-label='Actions']");
        await firstRowActions.click();

        await page.getByRole('button', { name: 'Traspasar' }).click();

        const modal = page.locator('dialog');
        await expect(modal).toBeVisible();

        const quantityInput = page.locator('input#quantity');
        const transferButton = modal.getByRole('button', { name: 'Traspasar' });
        const targetSelect = page.locator('select#toFundId');

        await quantityInput.fill('0');
        await expect(page.getByText('Minimo 1')).toBeVisible();
        await expect(transferButton).toBeDisabled();
        await quantityInput.fill((availableQuantity + 1).toString());
        await expect(page.getByText('Excede disponibles')).toBeVisible();
        await expect(transferButton).toBeDisabled();

        await quantityInput.fill('1');
        await targetSelect.selectOption({ index: 1 });

        await expect(transferButton).toBeEnabled();
        await transferButton.click();

        await expect(modal).not.toBeVisible();
    });
});
