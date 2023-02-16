import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService{
    public obterNegociacoesDoDia(): Promise<Negociacao[]>{
        //Requisção fetch para o endereço "http://localhost:8081/dados"
        return fetch('http://localhost:8081/dados')
            .then(res=>{
                return res.json()})
            .then((dados: NegociacoesDoDia[])=>{//"NegociacoesDoDia" é uma interface, ela só permite que o usuario acesse apenas vezes e montante
                return dados.map(dadoDeHoje => {//Converte esse Array para um novo Array onde cada dadoDeHoje vai ser convertido para uma negociação  
                    return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante)
                })
            })
    }
}