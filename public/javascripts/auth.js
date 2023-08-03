$(function () {
    // Cấu trúc của JQuery: đợi cho đến khi trang load xong thì mới chạy
    AUTH.bindingEvent();
});

const AUTH = {
    bindingEvent: () => {

        $('#btn-register-submit').unbind();
        $('#btn-register-submit').click(function (e) {
            AUTH.action.signUp();
        });

        $('#btn-login-submit').unbind();
        $('#btn-login-submit').click(function (e) {
            AUTH.action.signIn();
        });
    },
    action: {
        signUp: () => {
            // username
            let username = $('#username').val();
            // password
            let password = $('#password').val();
            // repassword
            let repassword = $('#repassword').val();
            // email
            let email = $('#email').val();
            // phone
            let phone = $('#phone').val();

            // Validate input data

            // Call api
            let url = 'http://localhost:8080/v1/api/auth/signup';
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        email,
                        phone
                    })
                }
            ).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    Toastify({
                        text: 'Đăng ký thành công',
                        duration: 3000
                    }).showToast();
                } else {
                    Toastify({
                        text: 'Đăng ký thất bại',
                        duration: 3000
                    }).showToast();
                }
            }).catch((e) => {
                console.log(e);
                Toastify({
                    text: 'Đăng ký thất bại',
                    duration: 3000
                }).showToast();
            });

        },
        signIn: () => {
            let username = $('#username').val();
            let password = $('#password').val();

            // Validate

            // Call api signIn
            let url = 'http://localhost:8080/v1/api/auth/signin';
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            ).then(async (res) => {
                let responseBody = await res.json();
                let token = responseBody.data.token;
                // lưu token vào local storage
                localStorage.setItem('token', token);
                Toastify({
                    text: 'Đăng nhập thành công',
                    duration: 2000
                }).showToast();
                setTimeout(() => {
                    // ridirect đến trang chủ
                    window.location = '/';
                }, 2010);
            })
        }
    }
}