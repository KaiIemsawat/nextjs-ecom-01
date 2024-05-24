import { Loader2 } from "lucide-react"; // come with shadcn/ui

const loading = () => {
    return (
        <div className="flex justify-center">
            <Loader2 className="size-24 animate-spin" />
        </div>
    );
};
export default loading;
