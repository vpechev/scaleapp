import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private options;
  constructor(private toastr: ToastrService) { 
    this.options = {
      closeButton: false,
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    }
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, this.options)
  }

  showError(message: string, title: string) {
      this.toastr.error(message, title, this.options)
  }

  showInfo(message: string, title: string) {
      this.toastr.info(message, title, this.options)
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, this.options)
  }
}
