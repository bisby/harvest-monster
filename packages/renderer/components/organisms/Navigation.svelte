<script>
  import { _ } from "svelte-i18n";
  import PrimaryButton from "../atoms/PrimaryButton.svelte";
  import { copyPost } from "#preload";
  import { formatPost } from "../../utils/formatPost";
  import { getInventory } from "../../utils/getInventory";
  import { crafts, exaltToChaosRate } from "../../stores";
  import { onDestroy } from "svelte";
  import { success } from "../../utils/toast";

  let inventory = getInventory($crafts);

  const unsubscribe = crafts.subscribe(async () => {
    inventory = getInventory($crafts);
  });

  onDestroy(unsubscribe);
</script>

{#await crafts}
  Loading...
{:then}
  <div
    class="flex flex-row justify-between items-center px-2 py-4 space-x-6 fixed w-full bg-background z-10 mt-16"
  >
    <div>
      <span class="bg-container rounded py-2 px-4 ml-2 text-sm"
        >{inventory.count}
        {$_("nav_crafts").toLowerCase()} | {inventory.exalt}ex {inventory.chaos}c</span
      >
      {#if $exaltToChaosRate > 1}
        <span class="text-xs">{$exaltToChaosRate}c:1ex</span>
      {/if}</div
    >
    <div class="grow">
      <div class="flex flex-row justify-end space-x-6">
        <PrimaryButton
          on:click={() => {
            success({
              title: "Copied to clipboard!",
              text: "Paste your clipboard contents in the appropriate TFT channel.",
            });
            copyPost(formatPost());
          }}>{$_("nav_copy")}</PrimaryButton
        >
      </div>
    </div>
  </div>
{/await}
