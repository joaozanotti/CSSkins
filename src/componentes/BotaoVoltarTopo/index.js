import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import estilos from "./BotaoVoltarTopo.module.css";

function BotaoVoltarTopo({resetarQtdItens}) {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const atualizarVisibilidade = () => setVisivel(window.scrollY > 300);

        atualizarVisibilidade();
        window.addEventListener("scroll", atualizarVisibilidade, { passive: true });

        return () => window.removeEventListener("scroll", atualizarVisibilidade);
    }, []);

    const voltarAoTopo = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => {
            resetarQtdItens();
        }, 1500);
    };

    return (
        <button
            type="button"
            className={`${estilos.botao} ${visivel ? estilos.visivel : ""}`}
            onClick={voltarAoTopo}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
        >
            <Icon icon="material-symbols:arrow-upward-rounded"/>
        </button>
    );
}

export default BotaoVoltarTopo;
