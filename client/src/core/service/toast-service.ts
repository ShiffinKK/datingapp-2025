import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor(){
    this.createToastContainer();
  }

  private createToastContainer(){
    if(!document.getElementById('toast-container')){
      const container=document.createElement('div')
      container.id='toast-container';
      container.className = 'position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '1100';      document.body.appendChild(container)
    }
  }

  private createToastElement(message:string,alertClass:string,duration=5000)
  {
    const toastContainer=document.getElementById('toast-container');
    if(!toastContainer) return;
   const toast = document.createElement('div');
    toast.classList.add('toast', 'align-items-center', 'text-bg-' + alertClass, 'border-0', 'show');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    toast.querySelector('button')?.addEventListener('click',()=>{
      toastContainer.removeChild(toast);
    })
    toastContainer.append(toast);
    setTimeout(()=>{
      if(toastContainer.contains(toast)){
        toastContainer.removeChild(toast);
      }
    },duration)
  }

  success(message:string,duration?: number){
    this.createToastElement(message,'success',duration)
  }
  error(message:string,duration?: number){
    this.createToastElement(message,'danger',duration)
  }
  warning(message:string,duration?: number){
    this.createToastElement(message,'warning',duration)
  }
  info(message:string,duration?: number){
    this.createToastElement(message,'info',duration)
  }
}
