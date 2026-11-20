import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }]
})
export class ValidandoCepDirective implements AsyncValidator {

  constructor(private consultaCepService: ConsultaCepService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.consultaCepService.getConsultarCep(cep).pipe(
      map((response: any) => response.erro ? { 'validadorCep': true } : null)
    );
  }

}
