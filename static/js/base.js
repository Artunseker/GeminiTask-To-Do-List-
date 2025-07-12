    // Add Todo JS - BACKEND COMPATIBLE
    const todoForm = document.getElementById('todoForm');
    if (todoForm) {
        todoForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const payload = {
                title: data.title,
                description: data.description.substring(0, 1000), // TRUNCATE to 1000 chars
                priority: parseInt(data.priority),
                complete: false
            };

            // Validation checks
            if (payload.title.length < 3 || payload.title.length > 50) {
                alert('❌ Title must be between 3 and 50 characters');
                return;
            }
            
            if (payload.description.length < 3) {
                alert('❌ Description must be at least 3 characters');
                return;
            }
            
            if (payload.priority < 1 || payload.priority > 5) {
                alert('❌ Priority must be between 1 and 5');
                return;
            }

            // Show warning if description was truncated
            if (data.description.length > 1000) {
                if (!confirm(`⚠️ Description is too long (${data.description.length} chars). It will be truncated to 1000 characters. Continue?`)) {
                    return;
                }
            }

            try {
                const token = getCookie('access_token');
                if (!token) {
                    alert('❌ Authentication required. Please login again.');
                    window.location.href = '/auth/login-page';
                    return;
                }

                const response = await fetch('/todo/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert('✅ Todo created successfully!');
                    form.reset(); // Clear the form
                    window.location.href = '/todo/todo-page';
                } else if (response.status === 401) {
                    alert('❌ Authentication failed. Please login again.');
                    window.location.href = '/auth/login-page';
                } else if (response.status === 422) {
                    const errorData = await response.json();
                    console.error('Validation error:', errorData);
                    alert(`❌ Validation error: ${JSON.stringify(errorData.detail)}`);
                } else {
                    const errorData = await response.json();
                    alert(`❌ Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('❌ An error occurred. Please try again.');
            }
        });
    }

    // Edit Todo JS - BACKEND COMPATIBLE VERSION
    const editTodoForm = document.getElementById('editTodoForm');
    if (editTodoForm) {
        editTodoForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        var url = window.location.pathname;
        const todoId = url.substring(url.lastIndexOf('/') + 1);

        // Backend expects TodoRequest format with validation
        const payload = {
            title: data.title || '',
            description: (data.description || '').substring(0, 1000), // TRUNCATE to 1000 chars
            priority: parseInt(data.priority) || 3,
            complete: data.complete === "on"  // Boolean conversion
        };

        // Validation checks
        if (payload.title.length < 3 || payload.title.length > 50) {
            alert('❌ Title must be between 3 and 50 characters');
            return;
        }
        
        if (payload.description.length < 3) {
            alert('❌ Description must be at least 3 characters');
            return;
        }
        
        if (payload.priority < 1 || payload.priority > 5) {
            alert('❌ Priority must be between 1 and 5');
            return;
        }

        // Show warning if description was truncated
        if (data.description && data.description.length > 1000) {
            if (!confirm(`⚠️ Description was too long and truncated to 1000 characters. Continue?`)) {
                return;
            }
        }

        try {
            const token = getCookie('access_token');
            console.log('Token:', token);
            console.log('Todo ID:', todoId);
            console.log('Payload:', payload);
            
            if (!token) {
                alert('❌ Authentication required. Please login again.');
                window.location.href = '/auth/login-page';
                return;
            }

            // Backend has PUT /todo/todo/{todo_id} endpoint
            const response = await fetch(`/todo/todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            console.log('Response status:', response.status);
            
            if (response.ok) {
                alert('✅ Todo updated successfully!');
                window.location.href = '/todo/todo-page';
            } else if (response.status === 401) {
                alert('❌ Authentication failed. Please login again.');
                window.location.href = '/auth/login-page';
            } else if (response.status === 404) {
                alert('❌ Todo not found. It may have been deleted.');
                window.location.href = '/todo/todo-page';
            } else if (response.status === 422) {
                const errorData = await response.json();
                console.error('Validation error:', errorData);
                alert(`❌ Validation error: ${JSON.stringify(errorData.detail)}`);
            } else {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert(`❌ Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('❌ Network error. Please check your connection.');
        }
    });

        // FIXED Delete Button - BACKEND COMPATIBLE
        const deleteButton = document.getElementById('deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', async function () {
                if (!confirm('🗑️ Are you sure you want to delete this todo?')) {
                    return;
                }
                
                var url = window.location.pathname;
                const todoId = url.substring(url.lastIndexOf('/') + 1);

                try {
                    const token = getCookie('access_token');
                    if (!token) {
                        alert('❌ Authentication required. Please login again.');
                        window.location.href = '/auth/login-page';
                        return;
                    }

                    // Backend has DELETE /todo/todo/{todo_id} endpoint
                    const response = await fetch(`/todo/todo/${todoId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    console.log('Delete response status:', response.status);

                    if (response.ok) {
                        alert('✅ Todo deleted successfully!');
                        window.location.href = '/todo/todo-page';
                    } else if (response.status === 401) {
                        alert('❌ Authentication failed. Please login again.');
                        window.location.href = '/auth/login-page';
                    } else if (response.status === 404) {
                        alert('❌ Todo not found. It may have been already deleted.');
                        window.location.href = '/todo/todo-page';
                    } else {
                        const errorText = await response.text();
                        console.error('Delete error:', errorText);
                        alert(`❌ Error deleting todo: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error('Delete network error:', error);
                    alert('❌ Network error while deleting.');
                }
            });
        }

        
    }

    // Login JS
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            const payload = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                payload.append(key, value);
            }

            try {
                const response = await fetch('/auth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: payload.toString()
                });

                if (response.ok) {
                    // Handle success (e.g., redirect to dashboard)
                    const data = await response.json();
                    // Delete any cookies available
                    logout();
                    // Save token to cookie
                    document.cookie = `access_token=${data.access_token}; path=/`;
                    window.location.href = '/todo/todo-page'; // Change this to your desired redirect page
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Register JS
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data.password2) {
                alert("Passwords do not match");
                return;
            }

            const payload = {
                email: data.email,
                username: data.username,
                first_name: data.firstname,
                last_name: data.lastname,
                role: data.role,
                phone_number: data.phone_number,
                password: data.password
            };

            try {
                const response = await fetch('/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    window.location.href = '/auth/login-page';
                } else {
                    // Handle error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }





    // Helper function to get a cookie by name
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    function logout() {
        // Get all cookies
        const cookies = document.cookie.split(";");
    
        // Iterate through all cookies and delete each one
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            // Set the cookie's expiry date to a past date to delete it
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    
        // Redirect to the login page
        window.location.href = '/auth/login-page';
    };