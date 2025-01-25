<script lang="ts">
    import {onMount} from 'svelte';
    import {goto} from "$app/navigation";
    import {authStore} from '../../stores/authStore';
    import {ROUTES} from '../../config/constants';
    import Navbar from "$lib/components/Navbar.svelte";
    import type {User} from "$lib/types/user";

    $: user = $authStore.user as User;
    $: isAuthenticated = $authStore.isAuthenticated;

    onMount(() => {
        // Initialize auth store
        authStore.initialize();

        // Check authentication
        if (!isAuthenticated || !$authStore.user) {
            goto(ROUTES.LOGIN);
        } else {
            console.log(user.userId);
        }
    });

  // Stažení hry
  async function downloadGame(userId: number) {
    try {
        const response = await fetch(`http://localhost:3000/api/games/download/${userId}/1`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${$authStore.token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Chyba: ${errorData.message}`);
            return;
        }

        // Stažení souboru
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Game1.exe';
        link.click();

        alert('Hra byla stažena a přidána do vaší knihovny!');
    } catch (error) {
        console.error(error);
        alert('Chyba při stahování hry.');
    }
}

</script>

<style>
  .button { padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer; }
  .download { background-color: #1d4ed8; color: white; border: none; }
  .start { background-color: #10b981; color: white; border: none; }
  .back { background-color: #6b7280; color: white; border: none; }
  .button:hover { opacity: 0.9; }
  .container { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 50px; }
</style>

<div class="container">
    <h1 class="text-white">Hra 1</h1>
    <p class="text-gray-300">Tato hra je připravena ke stažení a spuštění.</p>

    <button on:click={() => downloadGame(user.userId)} class="button download">
      Stáhnout Hru 1
    </button>

    <button on:click={() => window.history.back()} class="button back">
        Zpět
    </button>
</div>
