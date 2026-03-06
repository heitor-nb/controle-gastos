import type { CriarPessoaRequest, EditarPessoaRequest, Pessoa, TotaisPorPessoa } from "../@types/api/pessoa";

const apiUrl = import.meta.env.VITE_API_URL;

export async function recuperarPessoas() : Promise<Pessoa[]> {
    const response = await fetch(`${apiUrl}/pessoa/recuperar-todas`);

    if(!response.ok) throw new Error("Erro ao recuperar pessoas.");

    return response.json();
}

export async function recuperarTotaisPorPessoa() : Promise<TotaisPorPessoa> {
    const response = await fetch(`${apiUrl}/pessoa/recuperar-totais-por-pessoa`);

    if(!response.ok) throw new Error("Erro ao recuperar totais por pessoa.");

    return response.json();
}

export async function criarPessoa(body : CriarPessoaRequest) : Promise<Pessoa> {
    const response = await fetch(`${apiUrl}/pessoa`, {
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

export async function editarPessoa(body : EditarPessoaRequest) : Promise<Pessoa> {
    const response = await fetch(`${apiUrl}/pessoa`, {
        method: "PATCH",
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

export async function deletarPessoa(id: string) : Promise<void> {
    const response = await fetch(`${apiUrl}/pessoa/${id}`, { method: "DELETE" });

    if(!response.ok) throw new Error("Erro ao deletar pessoa.");
}