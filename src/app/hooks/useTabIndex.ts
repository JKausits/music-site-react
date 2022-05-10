import { useState } from "react";

export const useTabIndex = (
  index: number = 0
): [tabIndex: number, handleChangeTabIndex: (index: number) => void] => {
  const [tabIndex, setTabIndex] = useState<number>(index);

  const handleChangeTabIndex = (index: number) => setTabIndex(index);

  return [tabIndex, handleChangeTabIndex];
};
