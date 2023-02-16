import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
   
    }

    //O primeiro metodo a ser executado é "logarTempoDeExecucao" e depois "inspect"
    //Sua ordem é de cima para baixo
    //@logarTempoDeExecucao(true)
    //@inspect
    //O inspect não tem "()" pois é um decorator sem função
    public update(model: T): void {
        
        let template = this.template(model);
        this.elemento.innerHTML = template;
        
    }

    protected abstract template(model: T): string;
}