export interface Response<T> { 
    message?: string;
    data: T;
}
//interface com recebimento de generico para tratar respostas vindo da api, contendo a mensagem vinda da api,
//e o dado que recebe o generic, e este pode ser qualquer coisa, feito para facilitar as respostas recebidas