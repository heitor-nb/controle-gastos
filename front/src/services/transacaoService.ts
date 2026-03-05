import type { CriarTransacaoRequest, Transacao } from "../@types/api/transacao";

export async function recuperarTransacoes() : Promise<Transacao[]> {
    const response = await fetch("http://localhost:5231/transacao/recuperar-todas");

    if(!response.ok) throw new Error("Erro ao recuperar transações.");

    return response.json();
}

export async function criarTransacao(body : CriarTransacaoRequest) : Promise<Transacao> {
    const response = await fetch("http://localhost:5231/transacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok) throw new Error("Erro ao criar transação.");

    return response.json();
}