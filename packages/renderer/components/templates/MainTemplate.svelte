<script>
  import Titlebar from "../organisms/Titlebar.svelte";
  import Navigation from "../organisms/Navigation.svelte";
  import Crafts from "../../pages/Crafts.svelte";
  import SettingsPage from "../../pages/Settings.svelte";
  import { page } from "../../stores";
</script>

<div
  class="bg-background w-full h-full rounded-lg overflow-hidden bg-clip-content"
>
  <Titlebar />
  <Navigation />
  <div class="pt-32 relative">
    {#if $page === "crafts"}
      <Crafts />
    {:else if $page === "settings"}
      <SettingsPage />
    {/if}
  </div>
</div>
