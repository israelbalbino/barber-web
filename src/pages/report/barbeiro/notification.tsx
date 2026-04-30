import { useEffect, useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { LuLoader } from "react-icons/lu";
import { Sidebar } from "@/components/sidebar";

interface NotificationProps {
  id: string;
  title: string;
  message?: string;
  read: boolean;
  createdAt:string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    loadNotifications();
  }, []);

 


  async function loadNotifications() {
    try {

     const api = setupAPIClient();

      const res = await api.get("/notifications");
      setLoading(false)
      setNotifications(res.data);
    } catch (err) {
      setLoading(false)
      console.log("Erro ao carregar notificações", err);
    }
  }

  async function markAsRead(id: string) {
    try {

      const api = setupAPIClient();

      await api.post("/notification/read", { id });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.log("Erro ao marcar como lida", err);
    }
  }

  return (
    <Sidebar>
      <Flex direction="column" gap={3}>
         <Heading color="white" mb={4}>
        Notificações
      </Heading>

      {notifications.length === 0 && (
        <Text color="gray.400">Nenhuma notificação</Text>
      )}

      {notifications.map((item) => (
        <Flex
          key={item.id}
          p={4}
          borderRadius="md"
          bg={item.read ? "gray.800" : "#111827"}
          borderLeft={
            item.read ? "none" : "3px solid #D4AF37"
          }
          onClick={() => markAsRead(item.id)}
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
        >
         <Flex display="flex" direction="column">
         <Heading size="sm" color="white">
            {item.title}
          </Heading>

          {item.message && (
            <Text fontSize="sm" color="gray.400">
              {item.message}
            </Text>

            
          )}
         </Flex>

<Text color="gray.400" fontSize={14}>{new Date(item.createdAt).toLocaleDateString('pt-BR',{
            day:'2-digit',
            month:'2-digit'
          })}</Text>
         
        </Flex>
        
      ))}
      </Flex> 
    </Sidebar>
  );
}