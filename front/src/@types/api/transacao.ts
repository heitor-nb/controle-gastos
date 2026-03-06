import type { BaseEntity } from "./pessoa";

export type CriarTransacaoRequest = {
    descricao: string,
    valor: number,
    tipo: 'receita' | 'despesa',
    categoriaId: string,
    pessoaId: string
}

export type Transacao = BaseEntity & {
    descricao: string,
    valor: number,
    tipo: 'receita' | 'despesa',
    categoria: string,
    pessoa: string
}