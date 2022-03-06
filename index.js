function sendRequest() {
  const token = document.querySelector('#token').value;
  if(token.trim() == '') {
    $('#change').css('border-color', 'red').css('color', 'red');
    return $('.error').css('color', 'red').html('Token cannot be empty.');
  };
  
  const newUsername = document.querySelector('#username').value;
  if(newUsername.trim() == '') {
    $('#change').css('border-color', 'red').css('color', 'red');
    return $('.error').css('color', 'red').html('Username cannot be empty.');
  };

  $('.error').css('color', '#333').html('Your new username request is being processed.');
  $('#change').removeAttr('onclick');
  $.ajax({ 
    url: 'https://discord.com/api/v9/users/@me',
    method: 'PATCH',
    headers: {
      'Authorization': `Bot ${token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ username: newUsername }),
    success: data => {
      $('#change').css('border-color', 'green').css('color', 'green');
      $('.error').css('color', 'green').html('Your bot username has been changed.');
    },
    error: err => {
      $('#change').css('border-color', 'red').css('color', 'red').attr('onclick', 'sendRequest()');
      if(err.responseJSON.message == '401: Unauthorized') {
        $('.error').css('color', 'red').html('Invalid token.');
      } else $('.error').css('color', 'red').html(err.responseJSON.errors.username._errors[0].message);
    }
  });
};
