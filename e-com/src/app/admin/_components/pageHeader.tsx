// * use _ (underscore) to in front of folder name to tell NextJS that this folder will never be used as route

import { ReactNode } from "react";

export const PageHeader = ({ children }: { children: ReactNode }) => {
    return <h1 className="text-4xl mb-4">{children}</h1>;
};
