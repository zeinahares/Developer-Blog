const postFormHandler = async (event) => {
    console.log('postFormHandler')
    event.preventDefault();

    // Collect values from the comment form

    // TO DO!!!!! SAVE IMAGE URL TO DATABASE
    const title = document.querySelector('#new-title').value.trim();
    const body = document.querySelector('#new-body').value.trim();
    const pet_category = document.querySelector('#new-category select').value;
    const post_type = document.querySelector('#new-type select').value;
    
    if (title && body && pet_category && post_type) {
        const userID_El = document.querySelector('#user-id');
        const user_id = userID_El.getAttribute('data-user-id');;

        // let image_url = document.querySelector('#new-image-url').text;

        let image_url;
        // if (image_url === 'No file uploaded') {

            if (pet_category === 'Cats') {
                image_url = './img/cat-placeholder.png';
            } else {
                image_url = './img/dog-placeholder.png';
            }
        // }

        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogPost/', {
            method: 'POST',
            body: JSON.stringify({ title, body, pet_category, post_type, user_id, image_url}),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('response', response    )
        if (response.ok) {
            // If successful, refresh to view
            document.location.reload();
            // window.location.href = `/blogs/${response.id}`;
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);

    