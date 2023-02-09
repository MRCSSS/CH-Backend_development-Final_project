/* =================================== MODULES =================================== */

/* ================================== WEBSOCKET ================================== */

/* =================================== RENDER  =================================== */

/* ================================== FUNCTIONS ================================== */
const formData = document.querySelector('form');
    formData.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById("userExist").classList.remove("d-block");
    document.getElementById("userExist").classList.add("d-none");

    const pw1 = document.getElementById('password');
    const pw2 = document.getElementById('password_verif');

    if (pw1.value != pw2.value) {
        document.getElementById("noMatchPw").classList.remove("d-none");
        document.getElementById("noMatchPw").classList.add("d-block");

    } else {
        document.getElementById("noMatchPw").classList.remove("d-block");
        document.getElementById("noMatchPw").classList.add("d-none");

        const data = new URLSearchParams();
        for (const pair of new FormData(formData)) {
            data.append(pair[0], pair[1]);
        }
        
        fetch('apiV1/user/register', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.message === 'User registered successfully!!!'){
                window.location.replace("/login");
            } else if (res.error === 'User exists'){
                document.getElementById("userExist").classList.remove("d-none");
                document.getElementById("userExist").classList.add("d-block");
            }
        })
        .catch(error => console.error('Error:', error))
    }
})