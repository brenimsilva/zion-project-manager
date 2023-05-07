import { useEffect, useState } from "react";

interface IUseClassProps {
  condition: boolean;
  classOnFalse: string;
  classOnTrue: string;
}

const useClass = (props: IUseClassProps): string => {
  const [classResult, setClassResult] = useState(props.classOnFalse);
  useEffect(() => {
    setClassResult(() => {
      return props.condition ? props.classOnTrue : props.classOnFalse;
    });
  }, [props.condition]);

  return classResult;
};

export default useClass;
