import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FPageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // Define os títulos baseados nas rotas
    const titles: { [key: string]: string } = {
      "/": "Home - Frankenstain",
      "/contact": "Contatos - Frankenstain",
      "/contact/create": "Criar Contato - Frankenstain",
    };

    document.title = titles[location.pathname] || "Frankenstain"; // Título padrão caso a rota não esteja mapeada
  }, [location]);

  return null; // Este componente não renderiza nada
};

export default FPageTitleUpdater;
