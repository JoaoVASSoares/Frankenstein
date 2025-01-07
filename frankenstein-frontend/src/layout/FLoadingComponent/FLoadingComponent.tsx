import { Spinner } from "@material-tailwind/react";
import "./FLoadingComponent.css";

const FLoadingComponent = () => {
  return (
    <div id="contantLoading">
      <Spinner className="h-8 w-8" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      Carregando...
    </div>
  );
};

export default FLoadingComponent;
