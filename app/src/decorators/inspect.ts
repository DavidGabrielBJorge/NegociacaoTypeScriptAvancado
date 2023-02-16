    //O inspect vai mostrar o nome do método, seus parâ,etros e seu retorno 
    //Por não possuir parametros pode criar direto uma função
    export  function inspect(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){
            console.log(`---Método: ${propertyKey}`);
            console.log(`---Parâmetros: ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);
            console.log(`---retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        }

        return descriptor;
    }
