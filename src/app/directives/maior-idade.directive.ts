import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = control.value;
    if (!dataNascimento) {
      return null;
    }

    const [anoNascimento, mesNascimento, diaNascimento] = dataNascimento.split('-').map(Number);
    const hoje = new Date();
    let idade = hoje.getFullYear() - anoNascimento;

    if (
      hoje.getMonth() + 1 < mesNascimento ||
      (hoje.getMonth() + 1 === mesNascimento && hoje.getDate() < diaNascimento)
    ) {
      idade--;
    }

    const ehMaior = idade >= 18;
    return ehMaior ? null : { 'MaiorIdadeValidator': true };
  }

}
