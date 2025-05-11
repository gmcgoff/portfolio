document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('i');
    const navMenu = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggle the 'active' class
    });
});

document.addEventListener('DOMContentLoaded', () => {
    async function fetchData() {
        try {
            const response = await fetch('https://api.github.com/users/gmcgoff/repos');
            const data = await response.json();

            // Get the element where the repositories will be displayed
            const repoList = document.getElementById('repo-list');
            
            // Ensure that repoList exists before trying to manipulate it
            if (!repoList) {
                console.error('Element with id "repo-list" not found.');
                return;
            }

            // Clear any previous content
            repoList.innerHTML = '';

            if (data.length === 0) {
                repoList.innerHTML = 'No public repositories found.';
            } else {
                // Loop through each repository and display its name and stars
                data.forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('repo');
                    repoItem.innerHTML = `
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a> – ⭐ ${repo.stargazers_count} <br> - &#128064;  ${repo.watchers_count}
                    `;
                    repoList.appendChild(repoItem);
                });
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
        }
    }

    // Call the function after the DOM is ready
    fetchData();
});