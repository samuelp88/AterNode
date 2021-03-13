const Aternode = require('./aternode');
const aternos = new Aternode();

const aternosSessionCookie = 'nfpATubfeu0W7wMAc4E7731rqQfhGcUisNXNDCadwrXIHWag4APXCyNU4f2wx7ZqWnkIO5ITyfEhA67rdw33SJqmqChTwChlUA9J';

(async () =>{
    await aternos.getAjaxToken();

    // Equivalente ao metodo .login(), porém é mais rapido e não precisa fazer requisições.
    // Usa o cookie ATERNOS_SESSION para autenticar no aternos, pode ser usado caso não queira usar login e senha.
    aternos.setSessionCookie(aternosSessionCookie);

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

