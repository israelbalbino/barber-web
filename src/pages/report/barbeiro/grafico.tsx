import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

import {
  Flex,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface ChartData {
  name: string;
  Total: number;
}

interface ChartCardProps {
  data: ChartData[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {

  if (active && payload && payload.length) {
    return (
      <Box
        bg="#020617"
        border="1px solid rgba(255,255,255,0.08)"
        p={4}
        rounded="20px"
      >
        <Text
          color="#D4AF37"
          fontWeight="bold"
        >
          {label}
        </Text>

        <Text
          color="green.400"
          fontWeight="bold"
        >
          R$ {payload[0].value}
        </Text>
      </Box>
    );
  }

  return null;
};

export default function ChartCard({
  data,
}: ChartCardProps) {

  return (
    <Flex
      direction="column"
      p={6}
      rounded="30px"
      h="350px"
      overflow="hidden"
      bg="rgba(15,23,42,0.65)"
      backdropFilter="blur(14px)"
      border="none"
      outline="none"
      boxShadow="0 20px 40px rgba(0,0,0,0.35)"
    >
      <Heading
        size="sm"
        color="gray.300"
        mb={6}
      >
        Faturamento semanal
      </Heading>

      <Box sx={{
    ".recharts-wrapper:focus": {
      outline: "none",
    },

    ".recharts-surface:focus": {
      outline: "none",
    },

    ".recharts-responsive-container:focus": {
      outline: "none",
    },

    "svg:focus": {
      outline: "none",
    },
  }} flex={1}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            
            style={{
              outline: "none",
            }}
            margin={{
              top: 0,
              right: 0,
              left: 13,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              tick={{
                fill: "#FFF",
                fontSize: 10,
              }}
              
              axisLine={false}
              tickLine={false}
              dy={10}
              
            
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />

            <Line
            
              type="monotone"
              dataKey="Total"
              stroke="#D4AF37"
              strokeWidth={4}
              dot={false}
              activeDot={{
                r: 8,
                fill: "#D4AF37",
                stroke: "transparent",
                strokeWidth: 0,
              }}
              
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
}

export const getServerSideProps = canSSRAuth(
  async (ctx) => {

    try {

      const apiClient = setupAPIClient(ctx);

      const response = await apiClient.get(
        "/dashboard/grafico-dados"
      );

      return {
        props: {
          data: response.data,
        },
      };

    } catch (error) {

      return {
        redirect: {
          destination: "/dashboard/barbeiro",
          permanent: false,
        },
      };

    }
  },
  ["barbeiro"]
);