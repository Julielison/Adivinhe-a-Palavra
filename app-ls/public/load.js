async function loadTopPlayers() {
    try {
        const response = await fetch('/api/top-players');
        const topPlayers = await response.json();

        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = '';

        topPlayers.forEach(player => {
            const playerItem = document.createElement('li');
            playerItem.textContent = `${player.name}: ${player.score}`;
            leaderboard.appendChild(playerItem);
        });
    } catch (err) {
        console.error('Failed to load top players:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadTopPlayers);