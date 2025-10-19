 let loginBtn = document.querySelector('#login-btn')
 let nameInput = document.querySelector('#user-name')
 let passwordInput = document.querySelector('#password')
 let showDemoLink = document.querySelector('#show-demo')
 loginBtn.addEventListener('click' , (e)=>{
  if(nameInput.checkValidity() && passwordInput.checkValidity()){
    e.preventDefault()
     Swal.fire({
    title: 'کاربر یافت نشد!',
    text: 'نام کاربری یا رمز عبور اشتباه است. لطفاً دوباره تلاش کنید یا ثبت‌ نام کنید.',
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: 'ثبت نام',
    cancelButtonText: "تصحیح",
  }).then(data=>{
    if(data.isConfirmed) window.location.href= 'register.html'
  })
    
  }
  
 })
 showDemoLink.addEventListener('click' , ()=>{
    let user = {
        firstName : 'Amir',
        lastName : 'Rezazade',
        userName : 'amirrezazadeh.job@gmail.com',
        password : 'amir-1382',
    }
    window.localStorage.setItem('user' , JSON.stringify(user))
    window.location.href= 'index.html'
 })


 document.querySelector('#password-show').addEventListener('click' , e=>{
            if(e.target.previousElementSibling.type==='text'){
                e.target.previousElementSibling.type='password'
                e.target.innerHTML='<i class="fas fa-eye"></i>'
            }else{
                e.target.previousElementSibling.type='text'
                e.target.innerHTML='<i class="fas fa-eye-slash"></i>'
            }
        })

                
        particlesJS.load('particles-js', 'particlesjs-config.json', function() {});