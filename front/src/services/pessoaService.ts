import type { CriarPessoaRequest, EditarPessoaRequest, Pessoa } from "../@types/api/pessoa";

export async function recuperarPessoas() : Promise<Pessoa[]> {
    const response = await fetch("http://localhost:5231/pessoa/recuperar-todas");

    if(!response.ok) throw new Error("Erro ao recuperar pessoas.");

    return response.json();
}

export async function criarPessoa(body : CriarPessoaRequest) : Promise<Pessoa> {
    const response = await fetch("http://localhost:5231/pessoa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok) throw new Error("Erro ao criar pessoa.");

    return response.json();
}

export async function editarPessoa(body : EditarPessoaRequest) : Promise<Pessoa> {
    const response = await fetch("http://localhost:5231/pessoa", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok) throw new Error("Erro ao editar pessoa.");

    return response.json();
}

export async function deletarPessoa(id: string) : Promise<void> {
    const response = await fetch(`http://localhost:5231/pessoa/${id}`, { method: "DELETE" });

    if(!response.ok) throw new Error("Erro ao deletar pessoa.");
}