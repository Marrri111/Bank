document.addEventListener("DOMContentLoaded", function () {
    const createAccountForm = document.getElementById("createAccountForm");
    const accountList = document.getElementById("accountList");

    // Fetch and display all accounts on page load
    fetchAccounts();

    // Form submission handler
    createAccountForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const owner = document.getElementById("owner").value;
        createAccount({ owner });
    });

    // Fetch all accounts from the server
    function fetchAccounts() {
        fetch("/accounts")
            .then(response => response.json())
            .then(accounts => {
                accountList.innerHTML = "";
                accounts.forEach(account => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <span>${account.owner}: $${account.balance.toFixed(2)}</span>
                        <button onclick="deleteAccount(${account.id})">Delete</button>
                    `;
                    accountList.appendChild(listItem);
                });
            });
    }

    // Create a new account
    function createAccount(account) {
        fetch("/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        }).then(() => {
            fetchAccounts();
            createAccountForm.reset();
        });
    }

    // Delete an account
    window.deleteAccount = function (id) {
        fetch(`/accounts/${id}`, {
            method: "DELETE"
        }).then(() => fetchAccounts());
    }
});
