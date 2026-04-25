import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

type UserRole = "barbeiro" | "cliente";

function isValidRole(role: any): role is UserRole {
  return role === "barbeiro" || role === "cliente";
}

export function canSSRAuth<P>(
  fn: GetServerSideProps<P>,
  allowedRoles: UserRole[] = []
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["@barber.token"];
    const roleCookie = cookies["@barber.cliente"];

    const role = isValidRole(roleCookie) ? roleCookie : null;

    // 🔒 Não logado
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // 🔥 BLOQUEIO REAL POR TIPO
    if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, "@barber.token", { path: "/" });
        destroyCookie(ctx, "@barber.cliente", { path: "/" });

        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  };
}