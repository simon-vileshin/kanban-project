import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("kanban-board")).toBeVisible();
  });

  test("loads with dummy cards in expected columns", async ({ page }) => {
    const backlog = page.getByTestId("column-col-backlog");
    await expect(backlog.getByText("Define project scope")).toBeVisible();
    await expect(backlog.getByText("Design wireframes")).toBeVisible();

    const done = page.getByTestId("column-col-done");
    await expect(done.getByText("Polish UI styling")).toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    const backlog = page.getByTestId("column-col-backlog");
    await backlog.getByTestId("column-title").click();
    const input = backlog.getByTestId("column-title-input");
    await input.fill("Ideas");
    await input.press("Enter");

    await expect(backlog.getByTestId("column-title")).toHaveText("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    const ready = page.getByTestId("column-col-ready");
    await ready.getByTestId("add-card-toggle").click();
    await ready.getByTestId("add-card-title").fill("E2E test card");
    await ready.getByTestId("add-card-details").fill("Created by Playwright");
    await ready.getByTestId("add-card-submit").click();

    await expect(ready.getByText("E2E test card")).toBeVisible();
    await expect(ready.getByText("Created by Playwright")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    const backlog = page.getByTestId("column-col-backlog");
    const card = backlog.getByTestId("card-card-1");
    await expect(card).toBeVisible();

    await card.getByTestId("delete-card-card-1").click();
    await expect(backlog.getByText("Define project scope")).not.toBeVisible();
  });

  test("drags a card to another column", async ({ page }) => {
    const backlog = page.getByTestId("column-col-backlog");
    const done = page.getByTestId("column-col-done");

    const card = backlog.getByTestId("card-card-2");
    await expect(card).toBeVisible();

    const cardBox = await card.boundingBox();
    const doneBox = await done.boundingBox();
    if (!cardBox || !doneBox) throw new Error("Could not get bounding boxes");

    const startX = cardBox.x + cardBox.width / 2;
    const startY = cardBox.y + 20;
    const endX = doneBox.x + doneBox.width / 2;
    const endY = doneBox.y + 120;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 10, startY + 10, { steps: 5 });
    await page.mouse.move(endX, endY, { steps: 25 });
    await page.mouse.up();

    await expect(done.getByText("Design wireframes")).toBeVisible({ timeout: 10000 });
    await expect(backlog.getByText("Design wireframes")).not.toBeVisible();
  });
});
