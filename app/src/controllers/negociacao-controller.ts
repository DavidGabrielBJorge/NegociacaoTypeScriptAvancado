import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService =new NegociacoesService();

    constructor() {
        //Funciona como um getter
        //this.inputData = <HTMLInputElement>document.querySelector('#data');
        //this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        //this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    //importar decorator para realizar o teste de performance
    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        //Realizar o teste de performace criando T1 e T2 quando adiciona um elemento

        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
       
        //Vai exibir o tempo de performace quando adiciona uma negociacao
    }

    public importarDados(): void{
        this.negociacoesService.obterNegociacoesDoDia()
        .then(negociacoesDeHoje =>{//Dessa forma possuo uma lista de negociações no formato de negociação
            for(let negociacao of negociacoesDeHoje){//Pega cada negociação e adiciona
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
