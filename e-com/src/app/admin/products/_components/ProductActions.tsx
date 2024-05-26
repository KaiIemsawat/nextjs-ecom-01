"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
    deleteProduct,
    toggleProductAvailability,
} from "../../_actions/products";

export const ActiveToggleDropdownItem = ({
    id,
    isAvailableForPurchase,
}: {
    id: string;
    isAvailableForPurchase: boolean;
}) => {
    const [isPending, startTransition] = useTransition();

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(
                        id,
                        !isAvailableForPurchase
                    );
                });
            }}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    );
};

export const DeleteDropdownItem = ({
    id,
    disabled,
}: {
    id: string;
    disabled: boolean;
}) => {
    const [isPending, startTransition] = useTransition();

    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id);
                });
            }}
        >
            Delete
        </DropdownMenuItem>
    );
};