const moment = require('moment')
const conexao = require('../infraestrutura/conexao')
class Atendimento{
    Adiciona(atendimento, res){
        const dataCriacao = new moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.lenght >= 5
        
        const validacoes = [
            {
            nome: 'data',
            valido: dataValida,
            mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const exitemErros = erros.lenght

        if(exitemErros){
            res.status(400).json(erros)
        } else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                } else{
                    res.status(201).json(resultados)
                }
            })
        }
        
    }
}

module.exports = new Atendimento