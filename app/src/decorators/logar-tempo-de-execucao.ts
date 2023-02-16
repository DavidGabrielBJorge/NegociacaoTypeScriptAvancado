//O decorator pode ser usado em qualquer parte do código
//Nesse caso o decorator vai servir para medir a performance
//do programa
export function logarTempoDeExecucao(emSegundos: boolean = false){
    //Dessa forma o programador escolhe se será em segundos ou milisegundos
    return function(
        target: any, 
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;
        //Vai sobreescrever o comportamento
        descriptor.value = function(...args: Array<any>){
            //deve colocar o any pois em algumas classes que o decorator vai ser chamado recebem outros valores como o view que recebe modelo
            //Para fazer um teste de performance foi criado 2 variaveis T1 e T2

            let divisor = 1;
            let unidade='milisegundos'
            if(emSegundos){
                divisor=1000;
                unidade="segundos";
            }

            const T1 = performance.now();
            //A função perfomance é usada para testar a performace 

            //Chamar o metodo original
            const retorno = metodoOriginal.apply(this, args);//Vai passar os parametros caso precise
            const T2 = performance.now();

            console.log(`${propertyKey},tempo de execução ${(T2-T1)/divisor} ${unidade}`); 
            //Vai exibir o tempo de performace quando ocorre o update da tela
            retorno;
        };

        return descriptor;
    }
}
/*
Ao criar um decorator deve possuir a seguinte função:

return function(
        target: any = se for método estático vai servir como constructor, se não for funcionará como prototype, nesse caso será any (constructor ou prototype)
        propertyKey: string = ele revela o método que liga com string que possui o decorator(@)
        descripto: PropertyDescriptor = informa o método que deve ser modificado
    ){

    }
Outro ponto importante é que deve chamar o metodo original da função de criar ou update no meio do decorator
pois T1 vai pegar o tempo inicial e T2 vai pegar o tempo após a ação for decorrida.
Seguindo esse exemplo:

    public adiciona(): void {
        const T1 = performance.now();
       
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

            const T2 = performance.now();
            console.log(`${propertyKey},tempo de execução ${(T2-T1)/1000} segundos`); 
           
           
        }



*/