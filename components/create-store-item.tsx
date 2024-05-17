import { PlusCircle } from "lucide-react";

interface CreateStoreItemProps {
  onClick: () => void;
}

export const CreateStoreItem = ({ onClick }: CreateStoreItemProps) => {
  return (
    <div
      className="flex items-center px-2 py-1 cursor-pointer bg-gray-50 text-muted-foreground hover:text-primary"
      onClick={onClick}
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      Create Store
    </div>
  );
};
