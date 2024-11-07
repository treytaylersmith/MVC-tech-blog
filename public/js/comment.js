const newFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value.trim();
    const body = document.querySelector('textarea[name="comment-body"]').value.trim();

  
    if (body) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ postId, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        document.location.replace('/login');
      }
    }
  };
  
 
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', newFormHandler);
  

  