import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  totalPage: number | undefined;
  onPageChange: (page: number) => void;
};

const FPaginationButtons = (props: Props) => {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active < (props.totalPage ? props.totalPage : 1)) {
      const newPage = active + 1;
      setActive(newPage);
      props.onPageChange(newPage); // Chama o callback passando o novo valor
    }
  };

  const prev = () => {
    if (active > 1) {
      const newPage = active - 1;
      setActive(newPage);
      props.onPageChange(newPage); // Chama o callback passando o novo valor
    }
  };
  return (
    <div className="flex items-center gap-8">
      <IconButton size="sm" variant="outlined" onClick={prev} disabled={active === 1} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Página <strong className="text-gray-900">{active}</strong> de <strong className="text-gray-900">{props.totalPage}</strong>
      </Typography>
      <IconButton size="sm" variant="outlined" onClick={next} disabled={active === 10} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default FPaginationButtons;
