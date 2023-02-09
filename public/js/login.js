const formData = document.querySelector('form');
    formData.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById("badLogin").classList.remove("d-block");
    document.getElementById("badLogin").classList.add("d-none");

    const data = new URLSearchParams();
    for (const pair of new FormData(formData)) {
        data.append(pair[0], pair[1]);
    }
    
    fetch('apiV1/user/login', {
        method: 'POST',
        body: data,
    })
    .then((res) => console.log('res => ', res))
    .then(() => window.location.replace("/"))
    .catch(error => console.error('Error:', error))
})