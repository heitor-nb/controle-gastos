import type { BaseEntity } from "./pessoa";

export type CriarTransacaoRequest = {
    descricao: number,
    valor: number,
    tipo: 'receita' | 'despesa'
}

export type Transacao = BaseEntity & CriarTransacaoRequest & {
    categoria: string,
    pessoa: string
}