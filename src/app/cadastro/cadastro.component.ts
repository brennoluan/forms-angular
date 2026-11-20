import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../service/consulta-cep.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['/sucesso']);
    } else {
      alert('Formulário inválido.')
    }
    console.log(form.controls);
  }

  consultaCEP(event: any, form: NgForm) {
    const cep = event.target.value;
    if (cep !== '') {
      this.consultaCepService.getConsultarCep(cep).subscribe((dados: any) => {
        console.log(dados);
        this.populandoEndereco(dados, form);
      });
    }
  }

  populandoEndereco(dados: any, form: NgForm) {
    form.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }
}
