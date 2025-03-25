import { ChatbotCharacteristic } from "@/types/types";
import { CircleX } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface CharacteristicProps {
  characteristic: ChatbotCharacteristic;
  onDelete: (id: string) => void; // Prop to handle deletion
}

function Characteristic({ characteristic, onDelete }: CharacteristicProps) {
  const handleRemoveCharacteristic = async () => {
    try {
      const deletePromise = fetch(
        `/api/chatbot-characteristic/${characteristic.id}`,
        {
          method: "DELETE",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to delete characteristic");
        }
        return res.json(); // ✅ Ensure we resolve the JSON response
      });

      toast.promise(deletePromise, {
        loading: "Deleting characteristic...",
        success: "Characteristic deleted successfully",
        error: "Failed to delete characteristic",
      });

      onDelete(characteristic.id.toString()); // ✅ Remove from UI after successful deletion
    } catch (error) {
      toast.error("Failed to delete characteristic");
      console.error("Error deleting characteristic:", error);
    }
  };
  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <CircleX
        className="w-6 h-6 text-white fill-red-500  absolute top-1 right-1 cursor-pointer
        hover:opacity-50"
        onClick={() => {
          handleRemoveCharacteristic();
        }}
      />
    </li>
  );
}

export default Characteristic;
