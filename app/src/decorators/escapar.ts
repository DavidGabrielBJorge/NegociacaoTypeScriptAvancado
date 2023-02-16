//Esse decorator impede do usuário de inserir uma tag script no modelo
export function escapar(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
){
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]){
        let retorno = metodoOriginal.apply(this, args);
        if(typeof retorno =='string'){
            //console.log(`@escape em ação na classe ${this.constructor.name} para o metodo ${propertyKey}`)
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        return retorno;
    }
    return descriptor;
}