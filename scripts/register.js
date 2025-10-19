 let loginBtn = document.querySelector('#login-btn')
 let nameInput = document.querySelector('#user-name')
 let passwordInput = document.querySelector('#password')
 let showDemoLink = document.querySelector('#show-demo')
 loginBtn.addEventListener('click' , (e)=>{    
  if(nameInput.checkValidity() && passwordInput.checkValidity()){
    e.preventDefault()
   let user = {
        firstName : document.querySelector('#first-name').value.trim(),
        lastName :  document.querySelector('#last-name').value.trim(),
        userName :  document.querySelector('#user-name').value.trim(),
        password :  document.querySelector('#password').value.trim(),
    }
    window.localStorage.setItem('user' , JSON.stringify(user))
    window.location.href= 'index.html'
    
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