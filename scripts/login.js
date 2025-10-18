 document.querySelector('#password-show').addEventListener('click' , e=>{
            if(e.target.previousElementSibling.type==='text'){
                e.target.previousElementSibling.type='password'
                e.target.innerHTML='<i class="fas fa-eye"></i>'
            }else{
                e.target.previousElementSibling.type='text'
                e.target.innerHTML='<i class="fas fa-eye-slash"></i>'
            }
        })