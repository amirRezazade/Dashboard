function addToLocal(key , value){
    localStorage.setItem(key , JSON.stringify(value))
}
function getToLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function showSwal(title, text, icon, cancel, confirmText) {
  return Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: `${icon}`,
    showCancelButton: cancel,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `${confirmText}`,
    cancelButtonText: "انصراف",
  });
}
function showTost(icon, text) {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    icon: icon,
    title: text,
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "my-toast",
    },
  });
}



export{ addToLocal , getToLocal , showSwal , showTost}