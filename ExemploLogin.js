const Aternode = require('aternode');
const aternos = new Aternode();

(async () =>{
    // Faz o login no aternos.
    await aternos.login({user:'Username',password:'Password'});

    // Escolhe o servidor a ser iniciado usando um numero a partir de 1,
    //  se não tiver um parametro vai iniciar sempre o primeiro servidor.
    await aternos.getServers(1);

    // Inicia o servior escolhido.
    await aternos.start();

    // O evento queue é ativado toda vez que o metodo .autoConfirm() ou o metodo .getStatus() verificam o status atual da fila.
    // O callback retorna a posição do servidor na fila e o tempo estimado para o servidor ser iniciado.
    aternos.on('queue', (status) => {
        console.log(status);
    })

    // Caso tenha fila para iniciar o servidor no aternos, vai confirmar automaticamente quando for necessario.
    // O Callback é chamado quando o servidor estiver online e retorna informações do servidor como IP, IP Dinamico e etc...
    aternos.autoConfirm((info)=> {
        console.log(info);
    });
})();

