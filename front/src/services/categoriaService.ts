import type { Categoria, CriarCategoriaRequest, TotaisPorCategoria } from "../@types/api/categoria";

export async function recuperarCategorias() : Promise<Categoria[]> {
    const response = await fetch("http://localhost:5231/categoria/recuperar-todas");

    if(!response.ok) throw new Error("Erro ao recuperar categorias.");

    return response.json();
}

export async function recuperarTotaisPorCategoria() : Promise<TotaisPorCategoria> {
    const response = await fetch("http://localhost:5231/categoria/recuperar-totais-por-categoria");

    if(!response.ok) throw new Error("Erro ao recuperar totais por categoria.");

    return response.json();
}

export async function criarCategoria(body : CriarCategoriaRequest) : Promise<Categoria> {
    const response = await fetch("http://localhost:5231/categoria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok) throw new Error("Erro ao criar categoria.");

    return response.json();
}