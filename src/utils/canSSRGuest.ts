import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

type UserRole = "barbeiro" | "cliente";

// 🔐 validação segura
function isValidRole(role: any): role is UserRole {
  return role === "barbeiro" || role === "cliente";
}

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["@barber.token"];
    const roleCookie = cookies["@barber.cliente"]; // 🔥 padroniza nome

    const role = isValidRole(roleCookie) ? roleCookie : null;

    if (token) {
      // 🔥 redirecionamento inteligente e seguro
      if (role === "barbeiro") {
        return {
          redirect: {
            destination: "/report/barbeiro",
            permanent: false,
          },
        };
      }

      if (role === "cliente") {
        return {
          redirect: {
            destination: "/report/cliente",
            permanent: false,
          },
        };
      }

      // ⚠️ fallback (caso role esteja inválido)
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}