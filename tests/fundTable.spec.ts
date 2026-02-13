import { test, expect } from "@playwright/test";

test.describe("Funds table tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should visualize the list of funds", async ({ page }) => {
    const table = page.getByRole("heading");
    await expect(table).toBeVisible();

    const rowData = page.locator("tbody tr:nth-child(1) td:nth-child(1)");
    await expect(rowData).toBeVisible();
  });

  test("should view the details of a fund", async ({ page }) => {
    const firstRowActions = page.locator(
      "tbody tr:nth-child(1) td:nth-child(9) div:nth-child(1) div:nth-child(1) button:nth-child(1) svg",
    );
    await firstRowActions.click();

    await page.getByRole("button", { name: "Ver Detalle" }).click();

    const modal = page.locator("dialog");
    await expect(modal).toBeVisible();

    await expect(modal.getByText("Categoría")).toBeVisible();
    await expect(modal.getByText("Moneda")).toBeVisible();
    await expect(modal.getByText("Valor Actual")).toBeVisible();
    await page.getByRole("button", { name: "Cerrar" }).click();
    await expect(modal).not.toBeVisible();
  });

  test("should buy a fund and validate inputs", async ({ page }) => {
    const firstRowActions = page.locator(
      "tbody tr:nth-child(1) td:nth-child(9) div:nth-child(1) div:nth-child(1) button:nth-child(1) svg",
    );
    await firstRowActions.click();

    await page.getByRole("button", { name: "Comprar" }).click();

    const modal = page.locator("dialog");
    await expect(modal).toBeVisible();

    const quantityInput = page.locator("input#quantity");
    const buyButton = modal.getByRole("button", { name: "Comprar" });

    await quantityInput.fill("-5");
    await expect(
      page.getByText("La cantidad debe ser mayor a 0"),
    ).toBeVisible();
    await expect(buyButton).toBeDisabled();

    await quantityInput.fill("100000");
    await expect(
      page.getByText("La compra no puede superar los 10.000,00 €"),
    ).toBeVisible();
    await expect(buyButton).toBeDisabled();

    await quantityInput.fill("1");
    await expect(
      page.getByText("La cantidad debe ser mayor a 0"),
    ).not.toBeVisible();
    await expect(
      page.getByText("La compra no puede superar los 10.000,00 €"),
    ).not.toBeVisible();
    await expect(buyButton).toBeEnabled();
    await buyButton.click();

    await expect(modal).not.toBeVisible();
  });
});
