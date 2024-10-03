import { ResolveFn } from '@angular/router';
import { Register } from '../interfaces/register.interface';
import { inject } from '@angular/core';
import { FetchApiService } from '../services/fetch-api.service';

export const registerDetailsResolver: ResolveFn<Register[] | null> = (route) => {
  const id = route.paramMap.get("id")
  if(id)
  return inject(FetchApiService).getRegisterOfUrl(id);
  else 
  return null;
};
