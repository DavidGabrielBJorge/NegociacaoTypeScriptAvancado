/*Esse decorator vai no DOM, encontra o elemento e coloque o inputData, fazendo o 
seguinte trabalho: 
this.inputData = <HTMLInputElement>document.querySelector('#data');
this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
this.inputValor = document.querySelector('#valor') as HTMLInputElement;
*/
export function domInjector(seletor: string){
    return function(
        target: any,
        propertyKey: string){
            //console.log(propertyKey);
            //Tem que ser uma function para o contexto ser dinâmico, no caso o this
            console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`);
            let elemento: HTMLElement | null= null;//deve colocar o "| null" para fazer com que o HTMLElement receba null
            //O "elemento" vai servir como cache para impedir de toda hora buscar a propriedade "inputQuantidade, inputValor e inputData"
            const getter = function(){
                //Nesse getter toda vez que acessar a propriedade o getter também será chamado
                //com isso vai sobreescrever no prototype da classe(gerado pelo "propertyKey")
                if(!elemento){
                    elemento=<HTMLElement>document.querySelector(seletor);
                    console.log(`Buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`)
                }
            
                return elemento;
            }
            Object.defineProperty(
                target, 
                propertyKey,
                {get: getter}
                );
        }
}
/*
Nesse caso não terá "descriptor: PropertyDescriptor" pois não
vai sobreescrever nenhum método(gravar por cima do método original da
classe)
*/
