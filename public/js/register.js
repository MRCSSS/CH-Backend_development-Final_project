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
        
        fetch('/apiV1/user/register', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then(async res => {
            if(res.message === 'User registered successfully!!!'){
                const username = document.getElementById('username').value;

                await fetch(`/apiV1/cart`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: username})
                })
                .then(async () => {
                    await fetch(`/apiV1/user/login`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({username: username, password: pw1.value})
                    })
                    .then(() => window.location.replace("/"))   
                })
                .catch(error => console.error('Error:', error))
    
                // window.location.replace("/login");
            } else if (res.error === 'User exists'){
                document.getElementById("userExist").classList.remove("d-none");
                document.getElementById("userExist").classList.add("d-block");
            }

    
        })
        .catch(error => console.error('Error:', error))
    }
})