import type { BaseEntity } from "./pessoa";

export type Categoria = BaseEntity & {
    descricao: string,
    finalidade: 'receita' | 'despesa' | 'ambos'
}

export type TotaisCategoria = Categoria & {
    receitas: number,
    despesas: number,
    saldo: number
}

export type TotaisPorCategoria = {
    totaisCategorias: TotaisCategoria[],
    receitasTotais: number,
    despesasTotais: number,
    saldoTotal: number
}

export type CriarCategoriaRequest = {
    descricao: string,
    finalidade: 'receita' | 'despesa' | 'ambos'
}