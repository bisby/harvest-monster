// @ts-ignore
import App from "./App.svelte";
import CraftProcessingModal from "./components/organisms/CraftProcessingModal.svelte";
import { openModal } from "svelte-modals";
import { fetchData } from "./utils/fetchData";
import { get } from "svelte/store";
import { crafts, tftPrices } from "./stores";
import { forceResize, parseCrafts } from "#preload";

await fetchData();

// Bind the application to the root element.
const app = new App({
  target: document.getElementById("app"),
});

document.onpaste = async function () {
  openModal(CraftProcessingModal);
  forceResize(400);
  const newCrafts = await parseCrafts();
  const currentTftPrices = get(tftPrices);

  // If we have parsed new crafts, build and save.
  if (newCrafts && newCrafts.length > 0) {
    for (let craft of newCrafts) {
      // TODO: Only apply price if user indicated they prefer this.
      const price = currentTftPrices?.data?.filter(
        (c) => c.name === craft.name
      )[0];
      // TODO: Limit low confidence.
      craft.price = price?.exalt ?? -1;

      // Add the craft to the store.
      crafts.add(craft);
    }
    // Sort the crafts based on current settings.
    crafts.sort();
    // Save all of the crafts to memory.
    crafts.save();
    forceResize();
  }
};

export default app;
