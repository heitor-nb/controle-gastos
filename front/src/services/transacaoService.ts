import type { CriarTransacaoRequest, Transacao } from "../@types/api/transacao";

const apiUrl = import.meta.env.VITE_API_URL;

export async function recuperarTransacoes() : Promise<Transacao[]> {
    const response = await fetch(`${apiUrl}/transacao/recuperar-todas`);

    if(!response.ok) throw new Error("Erro ao recuperar transações.");

    return response.json();
}

export async function criarTransacao(body : CriarTransacaoRequest) : Promise<Transacao> {
    const response = await fetch(`${apiUrl}/transacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}