// json functions
async function load(url) {
    try {
        let returnList = [];
        const response = await fetch(`http://localhost:3000/${url}`);
        if (!response.ok) {
            throw new Error(`Error to load ${url} state:`, response.status);
        }
        returnList = await response.json();
        return returnList;
    } catch (error) {
        console.error(`error to load the ${url}`, error.message);
    }
}

async function save(newUser, url) {
    try {
        const response = await fetch(`http://localhost:3000/${url}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newUser)
        });
        if (!response.ok) {
            throw new Error(`Error to load ${url}. state:`, response.status);
        }
        const createdUser = await response.json();
        console.log("created ${url}:", createdUser);
    } catch (error) {
        console.error(`error to load the ${url}`, error.message);
    }
}


// <--Animations-->
const container = document.getElementById('container');
const registerBtn = document.getElementById('analysis');
const loginBtn = document.getElementById('citizen');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


