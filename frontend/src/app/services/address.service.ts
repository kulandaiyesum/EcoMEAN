import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject, shareReplay, takeUntil } from 'rxjs';
import { Address } from '../model/address';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AddressService implements OnDestroy {
  private http = inject(HttpClient);
  private readonly apiEndPoint: string = environment.apiUrl;
  private unsubscribe$ = new Subject<void>();
  private addressSubject = new BehaviorSubject<Address[]>([]);
  public readonly addressData$ = this.addressSubject.asObservable();
  // address
  constructor() {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllAddress() {
    const theme = localStorage.getItem('theme');
    this.http
      .get(`${this.apiEndPoint}/address`)
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.addressSubject.next((data as Address[]) || []);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            Swal.fire({
              title: 'Error!',
              html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1d4ed8',
              customClass: {
                popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
                title: theme === 'dark' ? '!text-white' : '',
                confirmButton: '!bg-blue-600 !hover:bg-blue-700',
              },
            });
          }
        },
      });
  }

  addNewAddress(address: Address) {
    const theme = localStorage.getItem('theme');
    this.http
      .post(`${this.apiEndPoint}/address`, address)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          const currentAdresss = this.addressSubject.getValue();
          const updatedAddresses = [...currentAdresss, res as Address];
          this.addressSubject.next(updatedAddresses);
        },
        error: (err) => {
          if (err?.error?.message) {
            Swal.fire({
              title: 'Error!',
              html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1d4ed8',
              customClass: {
                popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
                title: theme === 'dark' ? '!text-white' : '',
                confirmButton: '!bg-blue-600 !hover:bg-blue-700',
              },
            });
          }
        },
      });
  }
}
