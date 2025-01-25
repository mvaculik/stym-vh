<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";
    import { authStore } from '../../../stores/authStore';
    import { ROUTES } from '../../../config/constants';
    import Navbar from "$lib/components/Navbar.svelte";

    let userGames = [];
    $: user = $authStore.user;
    $: isAuthenticated = $authStore.isAuthenticated;

    async function fetchUserGames(userId: number) {
        try {
            const response = await fetch(`http://localhost:3000/api/games/library/${userId}`);
            if (response.ok) {
                const data = await response.json();
                userGames = data;
            } else {
                console.error('Failed to fetch user library.');
            }
        } catch (error) {
            console.error('Error fetching user games:', error);
        }
    }

    onMount(() => {
        // Initialize auth store
        authStore.initialize();

        // Check authentication
        if (!isAuthenticated) {
            goto(ROUTES.LOGIN);
        } else {
            // Fetch user's games
            fetchUserGames(user.userId);
        }
    });
</script>

<main class="min-h-screen bg-gray-800 p-4">
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto mt-24">
        <h1 class="text-2xl font-bold text-white">Your Library</h1>
        
            <ul class="mt-4">
                {#each userGames as game}
                    <li class="p-2 border border-gray-700 rounded mt-2 text-white">
                        <p>{game.game_title}</p>
                         <button class="button run">
                            Spustit hru
                        </button>
                    </li>
                {/each}
            </ul>
     
    </div>
</main>
