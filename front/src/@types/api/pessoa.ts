export type BaseEntity = {
    id: string,
    criadoEm: string
}

export type Pessoa = BaseEntity & {
    nome: string,
    idade: number
};

export type TotaisPessoa = Pessoa & {
    receitas: number,
    despesas: number,
    saldo: number
}

export type TotaisPorPessoa = {
    totaisPessoas: TotaisPessoa[],
    receitasTotais: number,
    despesasTotais: number,
    saldoTotal: number
}

export type CriarPessoaRequest = {
    nome: string,
    idade: number
}

export type EditarPessoaRequest = CriarPessoaRequest & {
    id: string
}